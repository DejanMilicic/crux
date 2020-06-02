using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.ViewModel.Core;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Interact;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class DashControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the DashController Home method - simple")]
        public async Task DashControllerHomeTest()
        {
            var data = new HomeApiDataHandler();

            var attendance = AttendanceData.GetFirstDisplay(false);
            attendance.When = DateTime.UtcNow.AddDays(2);
            
            var display = new HomeDisplay
            {
                Attendances = new List<AttendanceDisplay>() { attendance },
                Msgs = new List<MsgDisplay>() { MsgData.GetFirstDisplay(false) },
            };

            data.Result.Setup(m => m.Execute(It.IsAny<HomeComposite>())).Returns(display);

            var controller = new DashController(data, new LogicHandler()) { CurrentUser = StandardUser };
            var result = await controller.Home() as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as HomeViewModel;
            check.Success.Should().BeTrue();
            check.Should().NotBeNull();
            check.Attendance.Count().Should().Be(8);
            check.Msg.Count().Should().Be(1);
            check.Attendance.First().Total.Should().Be(0);
            check.Attendance.First().When.Should().BeBefore(DateTime.UtcNow);


            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<HomeComposite>()), Times.Once());
        }

        [Test(Description = "Tests the DashController Stats method - simple")]
        public async Task DashControllerStatsTest()
        {
            var data = new HomeApiDataHandler();
            var display = new StatsDisplay
            {
                Tenant = TenantData.GetFirstDisplay(),
                Meetings = new List<MeetingDisplay>() { MeetingData.GetFirstDisplay(false) },
                Msgs = new List<MsgDisplay>() { MsgData.GetFirstDisplay(false) },
            };

            data.Result.Setup(m => m.Execute(It.IsAny<StatsComposite>())).Returns(display);

            var controller = new DashController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Stats() as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as StatsViewModel;
            check.Should().NotBeNull();
            check.Meetings.Count().Should().Be(0);
            check.Messages.Count().Should().Be(0);
            check.Success.Should().BeTrue();
            Assert.That(check.Tenant, Is.DeepEqualTo(display.Tenant));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<StatsComposite>()), Times.Once());
        }

    }
}