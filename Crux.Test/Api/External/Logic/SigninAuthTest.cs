using System.Threading.Tasks;
using FluentAssertions;
using Crux.Endpoint.Api.External.Logic;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.External.Logic
{
    [TestFixture]
    public class SigninAuthTest : ControllerTest
    {
        [Test(Description = "Tests the SigninAuth Logic Command")]
        public async Task SigninAuthLogicSignup()
        {
            var logic = new CoreApiLogicHandler();

            logic.Result.Setup(m => m.Execute(It.IsAny<WriteToken>())).Returns(true);

            var command = new SigninAuth
            {
                LogicHandler = logic,
                Login = StandardUser,
                Config = UserConfigData.GetFirst(),
                Tenant = TenantData.GetFirst(),
                Settings = new FakeSettings()
            };

            await command.Execute();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Should().NotBeNull();

            command.Result.Verification.Should().BeNullOrEmpty();
            command.Result.Key.Should().NotBeNullOrEmpty();
            command.Result.Message.Should().BeNullOrEmpty();
            command.Result.Config.Should().NotBeNull();
            command.Result.Id.Should().NotBeNullOrEmpty();
            command.Result.Success.Should().BeTrue();
        }
    }
}