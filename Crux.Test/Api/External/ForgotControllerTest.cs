using System.Threading.Tasks;
using Crux.Data.Base;
using FluentAssertions;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.Api.External;
using Crux.Endpoint.Api.External.Logic;
using Crux.Endpoint.ViewModel.Core;
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
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Api.External
{
    [TestFixture]
    public class ForgotControllerTest : ControllerTest
    {
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the ForgotController Code method")]
        public async Task ForgotControllerCodeTest()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig();

            var confirm = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);
            var start = ForgotData.GetStart();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirm);
            logic.Result.Setup(m => m.Execute(It.IsAny<SimpleNotify>())).Returns(ActionConfirm.CreateSuccess("ok"));

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Code(start) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SimpleNotify>()), Times.Once);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Code method - No User")]
        public async Task ForgotControllerCodeTestNoUser()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig();

            var start = ForgotData.GetStart();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(null);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Code(start) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Code method - Too Many")]
        public async Task ForgotControllerCodeTestTooMany()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { ForgotCounter = 11 };

            var start = ForgotData.GetStart();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Code(start) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Reply method")]
        public async Task ForgotControllerReplyTest()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { ForgotCode = ForgotData.GetReply().Code, ResetAuth = ForgotData.GetReply().ResetAuth };

            var confirm = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);
            var reply = ForgotData.GetReply();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirm);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Reply(reply) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Reply method - No User")]
        public async Task ForgotControllerReplyTestNoUser()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            var reply = ForgotData.GetReply();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(null);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Reply(reply) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Reply method - Wrong Code")]
        public async Task ForgotControllerReplyTestWrongCode()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig() { ForgotCode = "Nonsense", ResetAuth = "Nonsense" };

            var reply = ForgotData.GetReply();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Reply(reply) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Reset method")]
        public async Task ForgotControllerResetTest()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultUser = StandardUser;
            data.ResultConfig = new UserConfig() { ForgotCode = ForgotData.GetReset().Code, ResetCode = ForgotData.GetReset().ResetCode };

            var confirmUser = ModelConfirm<User>.CreateSuccess(StandardUser);
            var confirmConfig = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);
            var reset = ForgotData.GetReset();
            var auth = LoginData.GetAuth();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(confirmUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirmConfig);
            logic.Result.Setup(m => m.Execute(It.IsAny<SigninAuth>())).Returns(auth);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Reset(reset) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SigninAuth>()), Times.Once);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Reset method - No User")]
        public async Task ForgotControllerResetTestNoUser()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            var reset = ForgotData.GetReset();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(null);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Reset(reset) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Reset method - Wrong Code")]
        public async Task ForgotControllerResetTestWrongCode()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultUser = StandardUser;
            data.ResultConfig = new UserConfig() { ForgotCode = "nonsense", ResetCode = "nonsense" };

            var reset = ForgotData.GetReset();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Reset(reset) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Cancel method")]
        public async Task ForgotControllerCancelTest()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            data.ResultConfig = new UserConfig();

            var confirm = ModelConfirm<UserConfig>.CreateSuccess(data.ResultConfig);
            var start = ForgotData.GetStart();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(confirm);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Cancel(start) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the ForgotController Cancel method - No User")]
        public async Task ForgotControllerCancelTestNoUser()
        {
            var data = new ForgotDataHandler();
            var logic = new CoreApiLogicHandler();

            var start = ForgotData.GetStart();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(null);

            var controller = new ForgotController(data, Cloud, logic);
            var result = await controller.Cancel(start) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

    }
}