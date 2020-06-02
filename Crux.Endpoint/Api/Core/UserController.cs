using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Persist;
using Crux.Data.Core.Query;
using Crux.Data.Core.Results;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Core;
using Crux.Model.Utility;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class UserController : OwnedController<User, UserViewModel, UserDisplay>
    {
        public UserController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get User for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(UserDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            var query = new UserDisplayById {Id = id};
            await DataHandler.Execute(query);

            if (query.Result != null)
            {
                if (CurrentUser.TenantId == query.Result.TenantId || CurrentUser.Right.CanSuperuser)
                {
                    return Ok(Strip(query.Result));
                }

                return Unauthorized();
            }

            return NotFound();
        }

        [HttpPost]
        [Description("Get a reference list of Users")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<ResultProfile>))]
        public async Task<IActionResult> Ref([FromBody] UserFilter viewModel)
        {
            CheckFilter(viewModel);
            var query = new UserRefByFilter {Filter = viewModel, CurrentUser = CurrentUser};
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<ResultProfile>>
                {Data = query.Result, Paging = query.Paging, Success = true});
        }

        [HttpPost]
        [Description("Get a filtered list of Users")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<UserDisplay>))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Filter([FromBody] UserFilter viewModel)
        {
            CheckFilter(viewModel);

            if (CurrentUser.Right.CanAdmin || CurrentUser.Right.CanSuperuser)
            {
                var query = new UserDisplayByFilter {Filter = viewModel, CurrentUser = CurrentUser};
                await DataHandler.Execute(query);
                return Ok(new PagedResult<IEnumerable<UserDisplay>>
                    {Data = Secure(query.Result), Paging = query.Paging, Success = true});
            }

            return Unauthorized();
        }

        [HttpPost]
        [Description("Add a new user")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Post([FromBody] UserViewModel viewModel)
        {
            var name = string.Empty;

            if (!string.IsNullOrEmpty(viewModel.Id))
            {
                var original = await Load(viewModel.Id);
                name = original.Name;
            }

            var model = await Parse(viewModel);

            if (AuthoriseWrite(model))
            {
                if (!string.IsNullOrEmpty(viewModel.Password))
                {
                    model.EncryptedPwd = EncryptHelper.Encrypt(viewModel.Password);
                }

                model.EncryptedPhone = viewModel.Phone;

                var image = new CheckProfileImage {Model = model};
                await LogicHandler.Execute(image);

                var persist = new UserSave {Model = model, Original = name};
                await DataHandler.Execute(persist);
                if (persist.Confirm.Success)
                {
                    await DataHandler.Commit();
                }

                return Ok(ConfirmViewModel.CreateFromConfirm(persist.Confirm));
            }

            return Unauthorized();
        }

        [HttpPost]
        [Description("Resets Password")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Reset([FromBody] ResetPwdViewModel viewModel)
        {
            if (CurrentUser.Id == viewModel.Id)
            {
                var loader = new Loader<User>() {Id = CurrentUser.Id};
                await DataHandler.Execute(loader);

                if (loader.Result != null && loader.Result.EncryptedPwd == EncryptHelper.Encrypt(viewModel.Current))
                {
                    loader.Result.EncryptedPwd = EncryptHelper.Encrypt(viewModel.Replacement);

                    var persist = new Persist<User> {Model = loader.Result};
                    await DataHandler.Execute(persist);
                    if (persist.Confirm.Success)
                    {
                        await DataHandler.Commit();
                    }

                    return Ok(ConfirmViewModel.CreateFromConfirm(persist.Confirm));
                }

                return Ok(ConfirmViewModel.CreateFailure("Password not correct"));
            }

            return Unauthorized();
        }

        protected override bool AuthoriseRead(User model)
        {
            if (model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin)
            {
                return true;
            }

            if (CurrentUser.Id == model.Id || CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override bool AuthoriseWrite(User model)
        {
            if (string.IsNullOrEmpty(model.Id) && model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin)
            {
                return true;
            }

            if (CurrentUser.Id == model.Id || CurrentUser.Right.CanSuperuser ||
                (model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin))
            {
                return true;
            }

            return false;
        }

        protected override UserDisplay Strip(UserDisplay item)
        {
            item.CanList = false;

            if ((CurrentUser.TenantId == item.TenantId && CurrentUser.Right.CanAdmin) || CurrentUser.Right.CanSuperuser)
            {
                item.CanAdd = true;
                item.CanList = true;
            }

            if ((item.TenantId == CurrentUser.TenantId && (CurrentUser.Id == item.Id || CurrentUser.Right.CanAdmin)) ||
                CurrentUser.Right.CanSuperuser)
            {
                item.CanEdit = true;
            }

            if ((item.TenantId == CurrentUser.TenantId && (CurrentUser.Id != item.Id && CurrentUser.Right.CanAdmin)) ||
                CurrentUser.Right.CanSuperuser)
            {
                item.CanDelete = true;
            }

            item.ChatCounter = 0;
            return item;
        }
    }
}