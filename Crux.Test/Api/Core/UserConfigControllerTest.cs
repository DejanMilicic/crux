using System.Configuration;
using Crux.Data.Core.Query;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Core;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class UserConfigControllerTest : ControllerTest
    {
        protected CoreApiLogicHandler Logic { get; set; } = new CoreApiLogicHandler();

        [Test(Description = "Tests the ConfigController Get method With Standard User")]
        public async Task UserConfigControllerGet()
        {
            var data = new UserConfigApiDataHandler();
            var user = StandardUser;
            var config = UserConfigData.GetFirst();
            var tenant = TenantData.GetFirstDisplay();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantDisplayById>())).Returns(tenant);

            var controller = new ConfigController(data, Logic) {CurrentUser = StandardUser, CurrentConfig = config};
            var result = await controller.Get() as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().BeOfType<CurrentViewModel>();

            var check = result.Value as CurrentViewModel;
            check.StorageLimit.Should().Be(tenant.StorageLimit);
            check.FileCount.Should().Be(tenant.FileCount);
            check.FileSize.Should().Be(tenant.FileSize);
            check.UserLimit.Should().Be(tenant.UserLimit);
            check.Config.TemplateView.Should().Be(config.TemplateView);
            check.Config.Id.Should().Be(config.Id);
            check.Config.TenantId.Should().Be(config.TenantId);
            check.UserCount.Should().Be(0);
            check.TenantId.Should().Be(config.TenantId);
            check.Id.Should().Be(user.Id);
            check.Right.CanSuperuser.Should().BeFalse();
            check.Right.CanAdmin.Should().BeFalse();
            check.Right.CanAuth.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDisplayById>()), Times.Once);
        }

        [Test(Description = "Tests the ConfigController Set method With Standard User - NoLogic")]
        public async Task UserConfigControllerSetNoLogic()
        {
            var data = new UserConfigApiDataHandler();
            var user = StandardUser;
            var config = UserConfigData.GetFirst();

            Logic.Result.Setup(m => m.Execute(It.IsAny<ChangeConfig>())).Returns(false);

            var controller = new ConfigController(data, Logic) {CurrentUser = StandardUser, CurrentConfig = config};
            var result = await controller.Set("TemplateView", "list") as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as ConfigViewModel;
            viewModel.Success.Should().BeFalse();
            viewModel.Message.Should().BeNullOrEmpty();
            viewModel.Key.Should().NotBeNullOrEmpty();
            viewModel.Config.Should().NotBeNull();

            Logic.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
        }

        [Test(Description = "Tests the ConfigController Set method With Standard User - WithLogic")]
        public async Task UserConfigControllerSetWithLogic()
        {
            var data = new UserConfigApiDataHandler();
            var user = StandardUser;
            var config = UserConfigData.GetFirst();

            Logic.Result.Setup(m => m.Execute(It.IsAny<ChangeConfig>())).Returns(true);

            var controller = new ConfigController(data, Logic) {CurrentUser = StandardUser, CurrentConfig = config};
            var result = await controller.Set("TemplateView", "list") as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as ConfigViewModel;
            viewModel.Success.Should().BeTrue();

            Logic.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeTrue();
        }
    }
}