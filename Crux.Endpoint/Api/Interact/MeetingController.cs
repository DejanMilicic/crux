using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Loader;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Interact.Logic;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Interact
{
    public class MeetingController : OwnedController<Meeting, MeetingViewModel, MeetingDisplay>
    {
        public MeetingController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get a Meeting ViewModel for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MeetingViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Get(string id)
        {
            var loader = new MeetingById() { Id = id };
            await DataHandler.Execute(loader);

            if (loader.Result == null)
            {
                return NotFound();
            }

            if (AuthoriseRead(loader.Result))
            {
                var viewModel = Mapper.Map<MeetingViewModel>(loader.Result);
                viewModel.Attendees = loader.ResultAttendees;
                return Ok(viewModel);
            }

            return Unauthorized();
        }

        [HttpGet]
        [Description("Get Meeting for a given identity")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(MeetingDisplay))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Display(string id)
        {
            var query = new MeetingDisplayById { Id = id };
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

        [HttpGet]
        [Description("Close a Meeting")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(bool))]
        public async Task<IActionResult> Close(string id)
        {
            var loader = new MeetingById { Id = id };
            await DataHandler.Execute(loader);

            var done = true;

            if (loader.Result != null)
            {
                foreach (var attendance in loader.ResultAttendances)
                {
                    if (!attendance.HasAttended && !attendance.IsCheckedIn && !attendance.IsNoShow)
                    {
                        done = false;
                    }
                }
            }

            if (done)
            {
                loader.Result.IsAttended = loader.ResultAttendances.All(a => !a.IsNoShow);
                loader.Result.IsComplete = true;

                var persist = new Persist<Meeting>() { Model = loader.Result };
                await DataHandler.Execute(persist);
                await DataHandler.Commit();
            }

            return Ok(ConfirmViewModel.Create(done, id));
        }

        [HttpPost]
        [Description("Get a filtered list of Meetings")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(IEnumerable<MeetingDisplay>))]
        public async Task<IActionResult> Filter([FromBody] MeetingFilter viewModel)
        {
            CheckFilter(viewModel);

            if (!viewModel.ParticipantKeys.Any() && !CurrentUser.Right.CanAdmin && !CurrentUser.Right.CanSuperuser)
            {
                viewModel.ParticipantKeys.Add(CurrentUser.Id);
            }

            var query = new MeetingDisplayByFilter { Filter = viewModel, CurrentUser = CurrentUser };
            await DataHandler.Execute(query);
            return Ok(new PagedResult<IEnumerable<MeetingDisplay>>
            { Data = Secure(query.Result), Paging = query.Paging, Success = true });
        }

        [HttpPost]
        [Description("Create a recurring Meeting")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public async Task<IActionResult> Recur([FromBody] RecurViewModel viewModel)
        {
            var loader = new Loader<Meeting>() { Id = viewModel.MeetingId };
            await DataHandler.Execute(loader);

            if (loader.Result == null)
            {
                return NotFound();
            }

            if (loader.Result.AuthorId == CurrentUser.Id ||
                (loader.Result.TenantId == CurrentUser.TenantId &&
                 (CurrentUser.Right.CanAdmin || CurrentUser.Right.CanAuth)) || CurrentUser.Right.CanSuperuser)
            {
                var model = new Meeting()
                {
                    Participants = loader.Result.Participants,
                    AuthorId = CurrentUser.Id,
                    AuthorName = CurrentUser.Name,
                    TenantId = CurrentUser.TenantId,
                    TenantName = CurrentUser.TenantName,
                    MeetingTypeId = loader.Result.MeetingTypeId,
                    RegionKey = CurrentUser.RegionKey,
                    Text = loader.Result.Text,
                    Name = loader.Result.Name,
                    IsPrivate = loader.Result.IsPrivate,
                    When = viewModel.When,
                    PreviousId = loader.Result.Id,
                    ForceNotify = false
                };

                var attendCheck = new AttendCheck()
                {
                    CurrentUser = CurrentUser,
                    DataHandler = DataHandler,
                    LogicHandler = LogicHandler,
                    Meeting = model
                };

                await LogicHandler.Execute(attendCheck);

                if (attendCheck.Result)
                {
                    loader.Result.NextId = attendCheck.Meeting.Id;
                    loader.Result.IsComplete = true;

                    var persist = new Persist<Meeting> { Model = loader.Result };
                    await DataHandler.Execute(persist);

                    if (persist.Confirm.Success)
                    {
                        await DataHandler.Commit();
                        return Ok(ConfirmViewModel.CreateSuccess(attendCheck.Meeting));
                    }
                }

                return Ok(ConfirmViewModel.CreateFailure("Failed to save Meeting"));
            }

            return Unauthorized();
        }

        [HttpPost]
        [Description("Save a Meeting")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public override async Task<IActionResult> Post([FromBody] MeetingViewModel viewModel)
        {
            var model = await Parse(viewModel);

            if (AuthoriseWrite(model))
            {
                model.Participants = viewModel.Attendees.Select(f => f.Id).ToList();

                var attendCheck = new AttendCheck()
                {
                    CurrentUser = CurrentUser,
                    DataHandler = DataHandler,
                    LogicHandler = LogicHandler,
                    Meeting = model
                };
                await LogicHandler.Execute(attendCheck);

                if (attendCheck.Result)
                {
                    await DataHandler.Commit();
                    return Ok(ConfirmViewModel.CreateSuccess(attendCheck.Meeting));
                }
                else
                {
                    return Ok(ConfirmViewModel.CreateFailure("Failed to save Meeting"));
                }
            }

            return Unauthorized();
        }

        protected override bool AuthoriseWrite(Meeting model)
        {
            if (model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAuth)
            {
                return true;
            }

            if (model.AuthorId == CurrentUser.Id || model.Participants.Any(p => p == CurrentUser.Id))
            {
                return true;
            }

            return false;
        }

        protected override MeetingDisplay Strip(MeetingDisplay item)
        {
            item = base.Strip(item);

            if ((item.TenantId == CurrentUser.TenantId && (CurrentUser.Right.CanAuth || CurrentUser.Right.CanAdmin)) ||
                CurrentUser.Right.CanSuperuser)
            {
                item.CanAdd = true;
            }

            if (item.Participants.Any(p => p.UserId == CurrentUser.Id) || item.AuthorId == CurrentUser.Id ||
                CurrentUser.Right.CanSuperuser || (CurrentUser.Right.CanAdmin && item.TenantId == CurrentUser.TenantId))
            {
                item.CanEdit = true;
            }

            if (item.AuthorId == CurrentUser.Id || CurrentUser.Right.CanSuperuser ||
                (CurrentUser.Right.CanAdmin && item.TenantId == CurrentUser.TenantId))
            {
                item.CanDelete = true;
            }

            return item;
        }
    }
}