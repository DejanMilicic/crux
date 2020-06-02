using Crux.Data.Base;
using Crux.Data.Base.Interface;
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
using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;

namespace Crux.Endpoint.Api.Core
{
    public class TenantController : NamedController<Tenant, TenantViewModel, TenantDisplay>
    {
        public TenantController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get Client for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(TenantDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            if (CurrentUser.TenantId == id || CurrentUser.Right.CanSuperuser)
            {
                var query = new TenantDisplayById { Id = id };
                await DataHandler.Execute(query);

                if (query.Result != null)
                {
                    return Ok(Strip(query.Result));
                }

                return NotFound();
            }

            return Unauthorized();
        }

        [HttpPost]
        [Description("Get a filtered list of Clients")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<TenantDisplay>))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Filter([FromBody] TenantFilter viewModel)
        {
            if (CurrentUser.Right.CanSuperuser)
            {
                var query = new TenantDisplayByFilter { Filter = viewModel, CurrentUser = CurrentUser };
                await DataHandler.Execute(query);
                return Ok(new PagedResult<IEnumerable<TenantDisplay>> { Data = Secure(query.Result), Paging = query.Paging, Success = true });
            }

            return Unauthorized();
        }

        [HttpPost]
        [Description("Save a tenant")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Post([FromBody] TenantViewModel viewModel)
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
                if (string.IsNullOrEmpty(model.Id))
                {
                    model.AuthorId = CurrentUser.Id;
                    model.AuthorName = CurrentUser.Name;
                    model.EntryKey = StringHelper.GenerateCode(10).ToLower();
                }

                var image = new CheckProfileImage { Model = model };
                await LogicHandler.Execute(image);

                var persist = new TenantSave { Model = model, Original = name };
                await DataHandler.Execute(persist);
                if (persist.Confirm.Success)
                {
                    await DataHandler.Commit();
                }

                return Ok(ConfirmViewModel.CreateFromConfirm(persist.Confirm));
            }

            return Unauthorized();
        }

        [HttpGet]
        [Description("Delete a Client properly")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Delete(string id)
        {
            var loader = new Loader<Tenant>() { Id = CurrentUser.TenantId };
            await DataHandler.Execute(loader);

            if (loader.Result == null)
            {
                return NotFound();
            }

            if (AuthoriseWrite(loader.Result))
            {
                var delete = new TenantDelete() { Id = id };
                await DataHandler.Execute(delete);

                if (delete.Result)
                {
                    await DataHandler.Commit();
                    return Ok(ConfirmViewModel.CreateSuccess(id));
                }

                return Ok(ConfirmViewModel.CreateFailure("Failed to delete"));
            }

            return Unauthorized();
        }

        protected override bool AuthoriseRead(Tenant model)
        {
            if ((model.Id == CurrentUser.TenantId && CurrentUser.Right.CanAdmin) || CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override bool AuthoriseWrite(Tenant model)
        {
            if ((model.Id == CurrentUser.TenantId && CurrentUser.Right.CanAdmin) || CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override TenantDisplay Strip(TenantDisplay item)
        {
            item.CanAdd = CurrentUser.Right.CanSuperuser;
            item.CanList = CurrentUser.Right.CanSuperuser;
            item.CanDelete = CurrentUser.Right.CanSuperuser;

            if ((item.Id == CurrentUser.TenantId && CurrentUser.Right.CanAdmin) || CurrentUser.Right.CanSuperuser)
            {
                item.CanEdit = true;
            }

            return item;
        }
    }
}