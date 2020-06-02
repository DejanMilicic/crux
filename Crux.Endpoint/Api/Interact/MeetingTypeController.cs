using System.Collections.Generic;
using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Interact
{
    public class MeetingTypeController : OwnedController<MeetingType, MeetingTypeViewModel, MeetingTypeDisplay>
    {
        public MeetingTypeController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get Meeting Type for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MeetingTypeDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            var query = new MeetingTypeDisplayById { Id = id };
            await DataHandler.Execute(query);

            if (query.Result != null)
            {
                if (query.Result.TenantId == CurrentUser.TenantId)
                {
                    return Ok(Strip(query.Result));
                }

                return Unauthorized();
            }

            return NotFound();
        }

        [HttpPost]
        [Description("Get a reference list of Message Types")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<ResultOwned>))]
        public async Task<IActionResult> Ref([FromBody] MeetingTypeFilter viewModel)
        {
            CheckFilter(viewModel);
            var query = new MeetingTypeRefByFilter { Filter = viewModel, CurrentUser = CurrentUser };
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<ResultOwned>>
            { Data = query.Result, Paging = query.Paging, Success = true });
        }

        [HttpPost]
        [Description("Get a filtered list of Message Types")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<MeetingTypeDisplay>))]
        public async Task<IActionResult> Filter([FromBody] MeetingTypeFilter viewModel)
        {
            CheckFilter(viewModel);
            var query = new MeetingTypeDisplayByFilter { Filter = viewModel, CurrentUser = CurrentUser };
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<MeetingTypeDisplay>>
            { Data = Secure(query.Result), Paging = query.Paging, Success = true });
        }

        protected override bool AuthoriseWrite(MeetingType model)
        {
            if ((model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin) ||
                CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override MeetingTypeDisplay Strip(MeetingTypeDisplay item)
        {
            if ((item.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAdmin) || CurrentUser.Right.CanSuperuser)
            {
                item.CanAdd = true;
                item.CanEdit = true;
            }

            return item;
        }
    }
}