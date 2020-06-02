using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Crux.Cloud.Core.Interface;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Loader;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Interact
{
    public class MsgController : OwnedController<Msg, MsgViewModel, MsgDisplay>
    {
        public MsgController(IDataHandler dataHandler, ICloudHandler cloudHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
            CloudHandler = cloudHandler;
        }

        public ICloudHandler CloudHandler { get; set; }

        [HttpGet]
        [Description("Get Message ViewModel for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MsgViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Get(string id)
        {
            var loader = new MsgById() {Id = id};
            await DataHandler.Execute(loader);

            if (loader.Result == null)
            {
                return NotFound();
            }

            if (AuthoriseRead(loader.Result))
            {
                var viewModel = Mapper.Map<MsgViewModel>(loader.Result);

                viewModel.Files = loader.ResultFiles;
                viewModel.Recipients = loader.ResultRecipients;

                if (!string.IsNullOrEmpty(loader.Result.ReplyId))
                {
                    viewModel.Reply = loader.ResultReply;
                }

                return Ok(viewModel);
            }

            return Unauthorized();
        }

        [HttpGet]
        [Description("Get Message for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MsgDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            var query = new MsgDisplayById {Id = id};
            await DataHandler.Execute(query);

            if (query.Result != null)
            {
                if (query.Result.AuthorId == CurrentUser.Id ||
                    query.Result.Recipients.Any(r => r.Id == CurrentUser.Id) || (CurrentUser.Right.CanAdmin && CurrentUser.TenantId == query.Result.TenantId) ||
                    CurrentUser.Right.CanSuperuser)
                {
                    return Ok(Strip(query.Result));
                }

                return Unauthorized();
            }

            return NotFound();
        }

        [HttpPost]
        [Description("Get a filtered list of Messages")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<MsgDisplay>))]
        public async Task<IActionResult> Filter([FromBody] MsgFilter viewModel)
        {
            if (!viewModel.AuthorKeys.Any() && !viewModel.RecipientKeys.Any())
            {
                viewModel.RecipientKeys.Add(CurrentUser.Id);
            }

            var query = new MsgDisplayByFilter {Filter = viewModel, CurrentUser = CurrentUser};
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<MsgDisplay>>
                {Data = Secure(query.Result), Paging = query.Paging, Success = true});
        }

        [HttpPost]
        [Description("Save a Message")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Post([FromBody] MsgViewModel viewModel)
        {
            var model = await Parse(viewModel);

            if (AuthoriseWrite(model))
            {
                model.Files = viewModel.Files.Select(f => f.Id).ToList();
                model.Recipients = viewModel.Recipients.Select(f => f.Id).ToList();

                var persist = new Persist<Msg> {Model = model};
                await DataHandler.Execute(persist);
                if (persist.Confirm.Success)
                {
                    await DataHandler.Commit();
                }

                if (string.IsNullOrEmpty(viewModel.Id) || viewModel.ForceNotify)
                {
                    foreach (var recipient in model.Recipients)
                    {
                        var loader = new UserById() {Id = recipient};
                        await DataHandler.Execute(loader);

                        var notify = new SimpleNotify
                        {
                            CloudHandler = CloudHandler, DataHandler = DataHandler, CurrentUser = loader.Result,
                            LogicHandler = LogicHandler, Model = persist.Model, TemplateName = "message"
                        };
                        await LogicHandler.Execute(notify);
                    }
                }

                return Ok(ConfirmViewModel.CreateFromConfirm(persist.Confirm));
            }

            return Unauthorized();
        }

        protected override bool AuthoriseRead(Msg model)
        {
            if (model.AuthorId == CurrentUser.Id || (CurrentUser.Right.CanAdmin && CurrentUser.TenantId == model.TenantId) || CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override bool AuthoriseWrite(Msg model)
        {
            if (model.AuthorId == CurrentUser.Id || CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override MsgDisplay Strip(MsgDisplay item)
        {
            if (item.AuthorId == CurrentUser.Id || CurrentUser.Right.CanSuperuser)
            {
                item.CanEdit = true;
                item.CanDelete = true;
            }

            item.CanAdd = true;
            item.CanList = true;

            return item;
        }
    }
}