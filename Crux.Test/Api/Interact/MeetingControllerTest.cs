using System;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using Crux.Endpoint.ViewModel.Base;
using Is = NUnit.DeepObjectCompare.Is;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Loader;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Interact;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;
using Crux.Model.Utility;
using Crux.Test.Api.Interact.Handler;
using Crux.Test.TestData.Interact;
using Crux.Endpoint.Api.Interact.Logic;

namespace Crux.Test.Api.Interact
{
    [TestFixture]
    public class MeetingControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the MeetingController Get method With Standard User")]
        public async Task MeetingControllerGet()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);

            var controller = new MeetingController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(MeetingData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as MeetingViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.Text.Should().Be(model.Text);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Get method With Admin User")]
        public async Task MeetingControllerGetAdmin()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);

            var controller = new MeetingController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Get(MeetingData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as MeetingViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.Text.Should().Be(model.Text);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Get method with a Null return from load")]
        public async Task MeetingControllerGetNull()
        {
            var data = new MeetingApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(null);

            var controller = new MeetingController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(MeetingData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Get method with Invalid Tenant User")]
        public async Task MeetingControllerGetUnauthorised()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);

            var controller = new MeetingController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Get(MeetingData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Display method with Admin User")]
        public async Task MeetingControllerDisplay()
        {
            var data = new MeetingApiDataHandler();
            var display = MeetingData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingDisplayById>())).Returns(display);

            var controller = new MeetingController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Display(MeetingData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Display method with Null Result")]
        public async Task MeetingControllerDisplayNull()
        {
            var data = new MeetingApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingDisplayById>())).Returns(null);

            var controller = new MeetingController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Display(MeetingData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Display method with Unauthorized Result")]
        public async Task MeetingControllerDisplayUnauthorized()
        {
            var data = new MeetingApiDataHandler();
            var display = MeetingData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingDisplayById>())).Returns(display);

            var controller = new MeetingController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Display(MeetingData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Filter method with Standard User")]
        public async Task MeetingControllerFilter()
        {
            var data = new MeetingApiDataHandler();
            var list = new List<MeetingDisplay> { MeetingData.GetFirstDisplay(false) };
            var filter = new MeetingFilter { TenantRestrict = true };

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingDisplayByFilter>())).Returns(list);

            var controller = new MeetingController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<MeetingDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Post method with add")]
        public async Task MeetingControllerPostAdd()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();
            var attendance = new List<Attendance>() { AttendanceData.GetFirst(), AttendanceData.GetSecond() };
            var users = new List<User>() { UserData.GetFirst(), UserData.GetSecond() };

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Loaders<Attendance>>())).Returns(attendance);
            data.Result.Setup(m => m.Execute(It.IsAny<Loaders<User>>())).Returns(users);

            var controller = new MeetingController(data, new LogicHandler() { DataHandler = data }) { CurrentUser = AdminUser };
            var viewModel = controller.Mapper.Map<MeetingViewModel>(model);
            viewModel.Id = string.Empty;
            viewModel.Attendees = new List<ResultProfile>() { UserData.GetFirstProfile(), UserData.GetSecondProfile() };

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Post method with edit")]
        public async Task MeetingControllerPostEdit()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();
            var attendance = new List<Attendance>() { AttendanceData.GetFirst(), AttendanceData.GetSecond() };
            var users = new List<User>() { UserData.GetFirst(), UserData.GetSecond() };

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Loaders<Attendance>>())).Returns(attendance);
            data.Result.Setup(m => m.Execute(It.IsAny<Loaders<User>>())).Returns(users);

            var controller = new MeetingController(data, new LogicHandler() { DataHandler = data }) { CurrentUser = StandardUser };
            var viewModel = controller.Mapper.Map<MeetingViewModel>(model);
            viewModel.Attendees = new List<ResultProfile>() { UserData.GetFirstProfile(), UserData.GetSecondProfile() };

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never());
        }

        [Test(Description = "Tests the MeetingController Get method with Invalid Meeting")]
        public async Task MeetingControllerPostUnauthorised()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(model);

            var controller = new MeetingController(data, Logic) { CurrentUser = NonTenantUser };
            var viewModel = controller.Mapper.Map<MeetingViewModel>(model);

            var result = await controller.Post(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never);
        }

        [Test(Description = "Tests the MeetingController Recur method")]
        public async Task MeetingControllerRecur()
        {
            var data = new MeetingApiDataHandler();
            var logic = new InteractApiLogicHandler();

            var viewModel = new RecurViewModel() { MeetingId = MeetingData.FirstId, When = DateHelper.FormatDayStart(DateTime.UtcNow) };

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(MeetingData.GetFirst());
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(MeetingData.GetSecond());
            logic.Result.Setup(m => m.Execute(It.IsAny<AttendCheck>())).Returns(true);

            var controller = new MeetingController(data, logic) { CurrentUser = StandardUser };
            var result = await controller.Recur(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Recur method - Logic Fail")]
        public async Task MeetingControllerRecurAttendFail()
        {
            var data = new MeetingApiDataHandler();
            var logic = new InteractApiLogicHandler();

            var viewModel = new RecurViewModel() { MeetingId = MeetingData.FirstId, When = DateHelper.FormatDayStart(DateTime.UtcNow) };

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(MeetingData.GetFirst());
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(MeetingData.GetSecond());
            logic.Result.Setup(m => m.Execute(It.IsAny<AttendCheck>())).Returns(false);

            var controller = new MeetingController(data, logic) { CurrentUser = StandardUser };
            var result = await controller.Recur(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never());
        }

        [Test(Description = "Tests the MeetingController Recur method - No Meeting")]
        public async Task MeetingControllerRecurNoMeeting()
        {
            var data = new MeetingApiDataHandler();
            var logic = new InteractApiLogicHandler();

            var viewModel = new RecurViewModel() { MeetingId = MeetingData.FirstId, When = DateHelper.FormatDayStart(DateTime.UtcNow) };

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(null);

            var controller = new MeetingController(data, logic) { CurrentUser = StandardUser };
            var result = await controller.Recur(viewModel) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never());
        }

        [Test(Description = "Tests the MeetingController Recur method - Unauthorised")]
        public async Task MeetingControllerRecurUnauthorised()
        {
            var data = new MeetingApiDataHandler();
            var logic = new InteractApiLogicHandler();

            var viewModel = new RecurViewModel() { MeetingId = MeetingData.FirstId, When = DateHelper.FormatDayStart(DateTime.UtcNow) };

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(MeetingData.GetFirst());

            var controller = new MeetingController(data, logic) { CurrentUser = NonTenantUser };
            var result = await controller.Recur(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never());
        }

        [Test(Description = "Tests the MeetingController Close method - Done")]
        public async Task MeetingControllerCloseDone()
        {
            var data = new MeetingApiDataHandler();
            var logic = new InteractApiLogicHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingById>())).Returns(MeetingData.GetFirst());
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(MeetingData.GetSecond());

            var attendance = AttendanceData.GetFirst();
            attendance.HasAttended = true;
            
            data.ResultAttendances = new List<Attendance>() { attendance };

            var controller = new MeetingController(data, logic) { CurrentUser = StandardUser };
            var result = await controller.Close(MeetingData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingById>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Close method - Not Done")]
        public async Task MeetingControllerCloseNotDone()
        {
            var data = new MeetingApiDataHandler();
            var logic = new InteractApiLogicHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingById>())).Returns(MeetingData.GetFirst());
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(MeetingData.GetSecond());

            var attendance = AttendanceData.GetFirst();
            attendance.HasAttended = false;

            data.ResultAttendances = new List<Attendance>() { attendance };

            var controller = new MeetingController(data, logic) { CurrentUser = StandardUser };
            var result = await controller.Close(MeetingData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingById>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never());
        }

        [Test(Description = "Tests the MeetingController Delete method With Standard User")]
        public async Task MeetingControllerDelete()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(model);

            var controller = new MeetingController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Delete(MeetingData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as ConfirmViewModel;
            viewModel.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingController Delete method With NonTenant User")]
        public async Task MeetingControllerDeleteFail()
        {
            var data = new MeetingApiDataHandler();
            var model = MeetingData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Meeting>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Meeting>>())).Returns(model);

            var controller = new MeetingController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Delete(MeetingData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Meeting>>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Meeting>>()), Times.Never());
        }

    }
}