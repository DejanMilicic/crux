using System;
using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Utility;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class DashController : SecureController
    {
        public DashController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }


        [HttpGet]
        [Description("Get the Home Data")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(HomeViewModel))]
        public async Task<IActionResult> Home()
        {
            const int forward = 8;

            var data = new HomeComposite() { CurrentUser = CurrentUser, Forward = forward };
            await DataHandler.Execute(data);

            var days = new DayDisplay<AttendanceDisplay>() { DateFrom = DateTime.UtcNow, Days = forward, Source = data.Result.Attendances };
            await LogicHandler.Execute(days);

            return Ok(new HomeViewModel() { Attendance = days.Result, Msg = data.Result.Msgs, Success = true });
        }

        [HttpGet]
        [Description("Get the Dashboard Data")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(StatsViewModel))]
        public async Task<IActionResult> Stats()
        {
            const int back = 30;

            var data = new StatsComposite() { CurrentUser = CurrentUser, Back = back };
            await DataHandler.Execute(data);

            var meetingDays = new DayDisplay<MeetingDisplay>()
            {
                DateFrom = DateHelper.FormatDayStart(DateTime.UtcNow.AddDays(-back)),
                Days = back,
                Source = data.Result.Meetings
            };
            await LogicHandler.Execute(meetingDays);

            var msgDays = new DayDisplay<MsgDisplay>()
            {
                DateFrom = DateHelper.FormatDayStart(DateTime.UtcNow.AddDays(-back)),
                Days = back,
                Source = data.Result.Msgs
            };
            await LogicHandler.Execute(msgDays);

            return Ok(new StatsViewModel()
            {
                Meetings = meetingDays.Result,
                Messages = msgDays.Result,
                Tenant = data.Result.Tenant,
                Success = true
            });
        }
    }
}