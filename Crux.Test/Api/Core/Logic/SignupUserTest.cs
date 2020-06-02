using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Persist;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.External;
using Moq;
using NUnit.Framework;
using Crux.Endpoint.Api.External.Logic;
using Crux.Model.Core;
using Crux.Data.Base;
using Crux.Test.Api.External.Handler;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class SignupUserTest : ControllerTest
    {
        [Test(Description = "Tests the SignupUser Logic Command")]
        public async Task SignupUserLogic()
        {
            var data = new SignupDataHandler();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var tenant = TenantData.GetFirst();
            var viewModel = LoginData.GetSignup();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(tenant);
            data.Result.Setup(m => m.Execute(It.IsAny<UserSave>())).Returns(StandardUser);

            logic.Result.Setup(m => m.Execute(It.IsAny<SimpleNotify>())).Returns(ActionConfirm.CreateSuccess("Worked"));

            var command = new SignupUser
            {
                DataHandler = data,
                CloudHandler = cloud,
                LogicHandler = logic,
                Input = viewModel
            };

            await command.Execute();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SimpleNotify>()), Times.Once());

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<UserSave>()), Times.AtLeastOnce());
        }

        [Test(Description = "Tests the SignupUser Logic Command - Missing Tenant ")]
        public async Task SignupUserLogicMissingEntry()
        {
            var data = new LoginDataHandler();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var viewModel = LoginData.GetSignup();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(null);

            var command = new SignupUser
            {
                DataHandler = data,
                CloudHandler = cloud,
                LogicHandler = logic,
                Input = viewModel,
                Result = ActionConfirm.CreateFailure("Failed")
            };

            await command.Execute();

            command.Result.Success.Should().BeFalse();

            logic.HasExecuted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<SimpleNotify>()), Times.Never());

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<UserSave>()), Times.Never());
        }
    }
}