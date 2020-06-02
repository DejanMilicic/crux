using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Endpoint.ViewModel.Core;
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
using Crux.Data.Interact.Persist;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Interact;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Core.Confirm;
using Crux.Model.Interact;
using Crux.Test.Api.Interact.Handler;
using Crux.Test.TestData.Interact;

namespace Crux.Test.Api.Interact
{
    [TestFixture]
    public class AttendanceControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the AttendanceController Get method With Standard User")]
        public async Task AttendanceControllerGet()
        {
            var data = new AttendanceApiDataHandler();
            var master = UserData.GetFirstProfile();
            var model = AttendanceData.GetFirst();
            data.ResultParticipants = new List<ResultProfile>() { master };

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceById>())).Returns(model);

            var controller = new AttendanceController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(AttendanceData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as AttendanceViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.AttendedWhen.Should().Be(model.AttendedWhen);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Get method With Admin User")]
        public async Task AttendanceControllerGetAdmin()
        {
            var data = new AttendanceApiDataHandler();
            var master = UserData.GetFirstProfile();
            var model = AttendanceData.GetFirst();
            data.ResultParticipants = new List<ResultProfile>() { master };

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceById>())).Returns(model);

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Get(AttendanceData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as AttendanceViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.AttendedWhen.Should().Be(model.AttendedWhen);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Get method with a Null return from load")]
        public async Task AttendanceControllerGetNull()
        {
            var data = new AttendanceApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Attendance>>())).Returns(null);

            var controller = new AttendanceController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(AttendanceData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Get method with Invalid Tenant User")]
        public async Task AttendanceControllerGetUnauthorised()
        {
            var data = new AttendanceApiDataHandler();
            var model = AttendanceData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Attendance>>())).Returns(model);

            var controller = new AttendanceController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Get(AttendanceData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Display method with Admin User")]
        public async Task AttendanceControllerDisplay()
        {
            var data = new AttendanceApiDataHandler();
            var display = AttendanceData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceDisplayById>())).Returns(display);

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Display(AttendanceData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Display method with Null Result")]
        public async Task AttendanceControllerDisplayNull()
        {
            var data = new AttendanceApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceDisplayById>())).Returns(null);

            var controller = new AttendanceController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Display(AttendanceData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Display method with Unauthorized Result")]
        public async Task AttendanceControllerDisplayUnauthorized()
        {
            var data = new AttendanceApiDataHandler();
            var display = AttendanceData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceDisplayById>())).Returns(display);

            var controller = new AttendanceController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Display(AttendanceData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Filter method with Standard User")]
        public async Task AttendanceControllerFilter()
        {
            var data = new AttendanceApiDataHandler();
            var list = new List<AttendanceDisplay> { AttendanceData.GetFirstDisplay(false) };
            var filter = new AttendanceFilter { TenantRestrict = true };

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceDisplayByFilter>())).Returns(list);

            var controller = new AttendanceController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<AttendanceDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Post method with add")]
        public async Task AttendanceControllerPostAdd()
        {
            var data = new AttendanceApiDataHandler();
            var model = AttendanceData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Attendance>>())).Returns(model);

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var viewModel = controller.Mapper.Map<AttendanceViewModel>(model);
            viewModel.Id = string.Empty;

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            viewModel.Participants.Count().Should().Be(0);
            viewModel.CanAttend.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Attendance>>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Post method with edit")]
        public async Task AttendanceControllerPostEdit()
        {
            var data = new AttendanceApiDataHandler();
            var model = AttendanceData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Attendance>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Attendance>>())).Returns(model);

            var controller = new AttendanceController(data, Logic) { CurrentUser = StandardUser };
            var viewModel = controller.Mapper.Map<AttendanceViewModel>(model);

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Attendance>>()), Times.Once());
        }

        [Test(Description = "Tests the AttendanceController Get method with Invalid Attendance")]
        public async Task AttendanceControllerPostUnauthorised()
        {
            var data = new AttendanceApiDataHandler();
            var model = AttendanceData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Attendance>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Attendance>>())).Returns(model);

            var controller = new AttendanceController(data, Logic) { CurrentUser = NonTenantUser };
            var viewModel = controller.Mapper.Map<AttendanceViewModel>(model);

            var result = await controller.Post(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Attendance>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Attendance>>()), Times.Never);
        }

        [Test(Description = "Tests the AttendanceController CheckIn method")]
        public async Task AttendanceControllerCheckIn()
        {
            var data = new AttendanceApiDataHandler();
            var confirm = ModelConfirm<Attendance>.CreateSuccess(AttendanceData.GetFirst());

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceCheckin>())).Returns(true);

            data.ResultConfirm = confirm;

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Checkin(MeetingData.FirstId, StandardUser.Id) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceCheckin>()), Times.Once);
        }

        [Test(Description = "Tests the AttendanceController CheckIn method - Fail")]
        public async Task AttendanceControllerCheckInFail()
        {
            var data = new AttendanceApiDataHandler();
            var confirm = ModelConfirm<Attendance>.CreateFailure("Failed");

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceCheckin>())).Returns(false);

            data.ResultConfirm = confirm;

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Checkin(MeetingData.FirstId, StandardUser.Id) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceCheckin>()), Times.Once);
        }

        [Test(Description = "Tests the AttendanceController NoShow method")]
        public async Task AttendanceControllerNoShow()
        {
            var data = new AttendanceApiDataHandler();
            var confirm = ModelConfirm<Attendance>.CreateSuccess(AttendanceData.GetFirst());

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceNoShow>())).Returns(true);

            data.ResultConfirm = confirm;

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.NoShow(MeetingData.FirstId, StandardUser.Id) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceNoShow>()), Times.Once);
        }

        [Test(Description = "Tests the AttendanceController NoShow method - Fail")]
        public async Task AttendanceControllerNoShowFail()
        {
            var data = new AttendanceApiDataHandler();
            var confirm = ModelConfirm<Attendance>.CreateFailure("Failed");

            data.Result.Setup(m => m.Execute(It.IsAny<AttendanceNoShow>())).Returns(false);

            data.ResultConfirm = confirm;

            var controller = new AttendanceController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.NoShow(MeetingData.FirstId, StandardUser.Id) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<AttendanceNoShow>()), Times.Once);
        }

    }
}