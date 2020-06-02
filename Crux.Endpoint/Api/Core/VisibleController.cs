using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Cloud.Core.Interface;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Query;
using Crux.Data.Core.Results;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Base;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class VisibleController : SecureController
    {
        public VisibleController(IDataHandler dataHandler, ICloudHandler cloudHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
            CloudHandler = cloudHandler;
        }

        public ICloudHandler CloudHandler { get; set; }

        [HttpGet]
        [Description("Get a Visible File Display")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(VisibleDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            var query = new VisibleDisplayById {Id = id};
            await DataHandler.Execute(query);

            if (query.Result != null)
            {
                if (CurrentUser.Id == query.Result.AuthorId ||
                    (CurrentUser.TenantId == query.Result.TenantId && CurrentUser.Right.CanAdmin) ||
                    CurrentUser.Right.CanSuperuser)
                {
                    return Ok(Strip(query.Result));
                }

                return Unauthorized();
            }

            return NotFound();
        }

        [HttpPost]
        [Description("Get a filtered list of Visible File")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(PagedResult<IEnumerable<VisibleDisplay>>))]
        public async Task<IActionResult> Filter([FromBody] VisibleFilter viewModel)
        {
            if (!viewModel.TenantRestrict && !CurrentUser.Right.CanSuperuser)
            {
                viewModel.TenantRestrict = true;
            }

            if (!CurrentUser.Right.CanAdmin && !CurrentUser.Right.CanSuperuser)
            {
                viewModel.AuthorKeys.Add(CurrentUser.Id);
            }

            var query = new VisibleDisplayByFilter {Filter = viewModel, CurrentUser = CurrentUser};
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<VisibleDisplay>>
                {Data = Secure(query.Result), Paging = query.Paging, Success = true});
        }

        [HttpGet]
        [Description("Delete a Visible File")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Delete(string id)
        {
            var query = new Loader<VisibleFile> {Id = id};
            await DataHandler.Execute(query);

            if (query.Result != null && AuthoriseWrite(query.Result))
            {
                var delete = new FileDelete {CloudHandler = CloudHandler, File = query.Result};
                await LogicHandler.Execute(delete);

                if (delete.Result.Success)
                {
                    await DataHandler.Commit();
                    return Ok(ConfirmViewModel.CreateSuccess(id));
                }

                return Ok(ConfirmViewModel.CreateFailure("Failed to delete file"));
            }

            return Unauthorized();
        }

        protected bool AuthoriseWrite(StoredFile model)
        {
            if (model.AuthorId == CurrentUser.Id ||
                (model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin) ||
                CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        private IEnumerable<VisibleDisplay> Secure(IEnumerable<VisibleDisplay> list)
        {
            foreach (var item in list)
            {
                Strip(item);
            }

            return list;
        }

        private VisibleDisplay Strip(VisibleDisplay item)
        {
            if (item.AuthorId == CurrentUser.Id ||
                (item.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin))
            {
                item.CanEdit = true;
                item.CanDelete = true;
            }

            return item;
        }
    }
}