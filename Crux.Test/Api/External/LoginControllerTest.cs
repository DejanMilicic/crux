using System.Threading.Tasks;
using Crux.Data.Base;
using FluentAssertions;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.Api.External;
using Crux.Endpoint.Api.External.Logic;
using Crux.Endpoint.ViewModel.External;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Api.External.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.External;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.External
{
    [TestFixture]
    public class LoginControllerTest : ControllerTest
    {
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the LoginController Auth method")]
        public async Task LoginControllerAuth()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig();

            var login = LoginData.GetLogin();
            var auth = LoginData.GetAuth();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);
            logic.Result.Setup(m => m.Execute(It.IsAny<SigninAuth>())).Returns(auth);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.Auth(login) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Once);

            auth.Id.Should().NotBeEmpty();
            auth.IsTwoFactor.Should().BeFalse();
            auth.User.ClientHasProfile.Should().BeFalse();
            auth.User.ClientProfileThumbUrl.Should().BeEmpty();
            auth.User.ProfileThumbUrl.Should().BeEmpty();
            auth.User.Email.Should().BeEmpty();
            auth.User.HasPhone.Should().BeFalse();
            auth.User.HasProfile.Should().BeFalse();
            auth.User.Name.Should().BeEmpty();
            auth.User.TenantId.Should().BeEmpty();
            auth.User.TenantName.Should().BeEmpty();
            auth.Right.Should().NotBeNull();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController Auth method - Fail")]
        public async Task LoginControllerAuthFail()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            var login = LoginData.GetLogin();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(null);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.Auth(login) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Never);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController Auth method - TwoFactor")]
        public async Task LoginControllerAuthTwoFactor()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { IsTwoFactor = true };

            var login = LoginData.GetLogin();
            var confirm = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirm);
            logic.Result.Setup(m => m.Execute(It.IsAny<SimpleNotify>())).Returns(ActionConfirm.CreateSuccess("ok"));

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.Auth(login) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Never);
            logic.Result.Verify(s => s.Execute(It.IsAny<SimpleNotify>()), Times.Once);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController TwoFactor method")]
        public async Task LoginControllerTwoFactor()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { IsTwoFactor = true, TwoFactorAuth = "123456", IsTwoFactorActive = true};

            var login = LoginData.GetTwoFactor();
            var confirm = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);
            var auth = LoginData.GetAuth();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirm);
            logic.Result.Setup(m => m.Execute(It.IsAny<SigninAuth>())).Returns(auth);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.TwoFactor(login) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Once);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserById>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController TwoFactor method - No User")]
        public async Task LoginControllerTwoFactorFailNoUser()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { IsTwoFactor = true, TwoFactorAuth = "123456", IsTwoFactorActive = true };

            var login = LoginData.GetTwoFactor();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(null);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.TwoFactor(login) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserById>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController TwoFactor method - Fail Wrong Code")]
        public async Task LoginControllerTwoFactorFailWrongCode()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { IsTwoFactor = true, TwoFactorAuth = "654321", IsTwoFactorActive = true };

            var login = LoginData.GetTwoFactor();
            var confirm = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirm);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.TwoFactor(login) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserById>()), Times.Once);
        }


        [Test(Description = "Tests the LoginController Reconnect method")]
        public async Task LoginControllerReconnect()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            var auth = LoginData.GetAuth();
            var reconnect = LoginData.GetReconnect();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(StandardUser);
            logic.Result.Setup(m => m.Execute(It.IsAny<SigninAuth>())).Returns(auth);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.Reconnect(reconnect) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Once);

            reconnect.Verification.Should().BeNullOrEmpty();
            reconnect.Id.Should().NotBeEmpty();
            reconnect.Key.Should().NotBeEmpty();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserById>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController Reconnect method - Fail")]
        public async Task LoginControllerReconnectFail()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            var reconnect = LoginData.GetReconnect();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(null);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.Reconnect(reconnect) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Never);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserById>()), Times.Once);
        }

        [Test(Description = "Tests the LoginController Reconnect method - InActive")]
        public async Task LoginControllerReconnectInActive()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();

            var model = UserData.GetFirst();
            model.IsActive = false;

            var reconnect = LoginData.GetReconnect();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(model);

            var controller = new LoginController(data, Cloud, logic);
            var result = await controller.Reconnect(reconnect) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Never);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserById>()), Times.Once);
        }
    }
}