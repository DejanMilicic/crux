using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Core;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class ChangeConfigTest : ControllerTest
    {
        [Test(Description = "Tests the ChangeConfig Logic Command on Config")]
        [TestCase("HASINTRO", "true")]
        [TestCase("HASINTRO", "false")]
        [TestCase("TEMPLATEVIEW", "Wall")]
        [TestCase("TEMPLATEVIEW", "List")]
        [TestCase("EMAILNOTIFY", "true")]
        [TestCase("EMAILNOTIFY", "false")]
        [TestCase("PUSHNOTIFY", "true")]
        [TestCase("PUSHNOTIFY", "false")]
        [TestCase("SMSNOTIFY", "true")]
        [TestCase("SMSNOTIFY", "false")]
        [TestCase("TAKE", "5")]
        public async Task ChangeConfigLogicConfigSet(string key, string value)
        {
            var data = new UserConfigApiDataHandler();
            var config = UserConfigData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<UserConfig>>())).Returns(config);

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = StandardUser,
                Key = key,
                Value = value,
                ResultConfig = config,
                UserId = StandardUser.Id
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<UserConfig>>()), Times.Once());
        }

        [Test(Description = "Tests the ChangeConfig Logic Command on default")]
        [TestCase("NONSENSE", "NONSENSE")]
        public async Task ChangeConfigLogicConfigSetDefault(string key, string value)
        {
            var data = new UserConfigApiDataHandler();
            var config = UserConfigData.GetFirst();

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = StandardUser,
                Key = key,
                Value = value,
                ResultConfig = config,
                UserId = StandardUser.Id
            };

            await command.Execute();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<UserConfig>>()), Times.Never());
        }

        [Test(Description = "Tests the ChangeConfig Logic Command on Right")]
        [TestCase("CANSUPERUSER", "true")]
        [TestCase("CANADMIN", "true")]
        [TestCase("CANAUTH", "true")]
        [TestCase("CANAUTH", "false")]
        [TestCase("CANADMIN", "false")]
        [TestCase("CANSUPERUSER", "false")]
        public async Task ChangeConfigLogicRightSet(string key, string value)
        {
            var data = new UserApiDataHandler();
            var config = UserConfigData.GetFourth();

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(SuperUser);

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = SuperUser,
                Key = key,
                Value = value,
                ResultConfig = config,
                UserId = SuperUser.Id,
                ResultUser = SuperUser
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Once());
        }

        [Test(Description = "Tests the ChangeConfig Logic Command on Right default")]
        [TestCase("NONSENSE", "NONSENSE")]
        public async Task ChangeConfigLogicRightSetDefault(string key, string value)
        {
            var data = new UserApiDataHandler();
            var config = UserConfigData.GetFourth();

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = SuperUser,
                Key = key,
                Value = value,
                ResultConfig = config,
                UserId = SuperUser.Id,
                ResultUser = SuperUser
            };

            await command.Execute();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Never());
        }

        [Test(Description = "Tests the ChangeConfig Logic Command on Different User")]
        public async Task ChangeConfigLogicConfigSetSuperUser()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();
            var config = UserConfigData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = SuperUser,
                Key = "CANAUTH",
                Value = "true",
                ResultConfig = config,
                UserId = StandardUser.Id
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Once());
        }

        [Test(Description = "Tests the ChangeConfig Logic Command on Different User")]
        public async Task ChangeConfigLogicConfigSetAdminUser()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();
            var config = UserConfigData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = AdminUser,
                Key = "CANAUTH",
                Value = "true",
                ResultConfig = config,
                UserId = StandardUser.Id
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Once());
        }

        [Test(Description = "Tests the ChangeConfig Logic Command on Different User")]
        public async Task ChangeConfigLogicConfigSetUnauthorized()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();
            var config = UserConfigData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<UserById>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var command = new ChangeConfig
            {
                DataHandler = data,
                CurrentUser = NonTenantUser,
                Key = "CANAUTH",
                Value = "true",
                ResultConfig = config,
                UserId = StandardUser.Id
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Never());
        }
    }
}