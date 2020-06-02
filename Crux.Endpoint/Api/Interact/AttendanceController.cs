using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Loader;
using Crux.Data.Interact.Persist;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Interact
{
    public class AttendanceController : OwnedController<Attendance, AttendanceViewModel, AttendanceDisplay>
    {
        public AttendanceController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get an Attendance ViewModel for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AttendanceViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Get(string id)
        {
            var loader = new AttendanceById() {Id = id};
            await DataHandler.Execute(loader);

            if (loader.Result == null)
            {
                return NotFound();
            }

            if (AuthoriseRead(loader.Result))
            {
                var viewModel = Mapper.Map<AttendanceViewModel>(loader.Result);

                if (loader.Result.UserId == CurrentUser.Id)
                {
                    viewModel.CanAttend = true;
                }

                viewModel.Participants = loader.ResultParticipants.Where(p => p.Id != CurrentUser.Id);

                return Ok(viewModel);
            }

            return Unauthorized();
        }

        [HttpGet]
        [Description("Get an Attendance for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AttendanceDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            var query = new AttendanceDisplayById {Id = id};
            await DataHandler.Execute(query);

            if (query.Result != null)
            {
                if (query.Result.TenantId == CurrentUser.TenantId ||
                    query.Result.Participants.Any(p => p.Id == CurrentUser.Id))
                {
                    return Ok(Strip(query.Result));
                }

                return Unauthorized();
            }

            return NotFound();
        }

        [HttpPost]
        [Description("Get a filtered list of Attendances")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<AttendanceDisplay>))]
        public async Task<IActionResult> Filter([FromBody] AttendanceFilter viewModel)
        {
            CheckFilter(viewModel);

            if (!viewModel.ParticipantKeys.Any() && !CurrentUser.Right.CanAdmin && !CurrentUser.Right.CanSuperuser)
            {
                viewModel.ParticipantKeys.Add(CurrentUser.Id);
            }

            var query = new AttendanceDisplayByFilter {Filter = viewModel, CurrentUser = CurrentUser};
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<AttendanceDisplay>>
                {Data = Secure(query.Result), Paging = query.Paging, Success = true});
        }

        [HttpGet]
        [Description("Mark attendance for a user")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(bool))]
        public async Task<IActionResult> Checkin(string key, string value)
        {
            var query = new AttendanceCheckin {MeetingId = key, AttendeeId = value, CurrentUserId = CurrentUser.Id};
            await DataHandler.Execute(query);

            if (query.Result)
            {
                if (query.Confirm.Success)
                {
                    await DataHandler.Commit();
                    return Ok(true);
                }
            }

            return Ok(false);
        }

        [HttpGet]
        [Description("Mark no show for a user")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(bool))]
        public async Task<IActionResult> NoShow(string key, string value)
        {
            var query = new AttendanceNoShow {MeetingId = key, AttendeeId = value, CurrentUserId = CurrentUser.Id};
            await DataHandler.Execute(query);

            if (query.Result)
            {
                if (query.Confirm.Success)
                {
                    await DataHandler.Commit();
                    return Ok(true);
                }
            }

            return Ok(false);
        }

        [HttpPost]
        [Description("Save a new Attendance")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Post([FromBody] AttendanceViewModel viewModel)
        {
            var model = await Parse(viewModel);

            if (AuthoriseWrite(model))
            {
                var persist = new Persist<Attendance> {Model = model};
                await DataHandler.Execute(persist);
                await DataHandler.Commit();

                return Ok(ConfirmViewModel.CreateFromConfirm(persist.Confirm));
            }

            return Unauthorized();
        }

        protected override bool AuthoriseWrite(Attendance model)
        {
            if (base.AuthoriseWrite(model))
            {
                return true;
            }

            if (model.UserId == CurrentUser.Id)
            {
                return true;
            }

            return false;
        }

        protected override AttendanceDisplay Strip(AttendanceDisplay item)
        {
            if (item.AuthorId == CurrentUser.Id || item.UserId == CurrentUser.Id)
            {
                item.CanEdit = true;
            }

            if (item.Participants.Any(p => p.Id == CurrentUser.Id) || item.UserId == CurrentUser.Id ||
                item.AuthorId == CurrentUser.Id || CurrentUser.Right.CanSuperuser ||
                (CurrentUser.Right.CanAdmin && CurrentUser.TenantId == item.TenantId))
            {
                item.CanAttend = true;
            }

            return item;
        }
    }
}