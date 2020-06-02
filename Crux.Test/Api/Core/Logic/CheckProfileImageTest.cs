using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class CheckProfileImageTest : ControllerTest
    {
        [Test(Description = "Tests the CheckProfileImage Logic Command")]
        public async Task CheckProfileImageLogic()
        {
            var data = new FakeApiDataEntityHandler<ImageFile>();
            var logic = new FakeApiLogicHandler();

            var model = VisibleData.GetFirst();
            var user = UserData.GetFifth();
            user.ProfileId = model.Id;

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<ImageFile>>())).Returns(model);

            var command = new CheckProfileImage
            {
                DataHandler = data,
                LogicHandler = logic,
                Model = user
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<ImageFile>>()), Times.Once());
        }

        [Test(Description = "Tests the CheckProfileImage Logic Command - Missing")]
        public async Task CheckProfileImageLogicMissing()
        {
            var data = new FakeApiDataEntityHandler<ImageFile>();
            var logic = new FakeApiLogicHandler();

            var profile = UserData.GetThird();

            var command = new CheckProfileImage
            {
                DataHandler = data,
                LogicHandler = logic,
                Model = profile
            };

            await command.Execute();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
        }

        [Test(Description = "Tests the CheckProfileImage Logic Command - No Image")]
        public async Task CheckProfileImageLogicNoImage()
        {
            var data = new FakeApiDataEntityHandler<ImageFile>();
            var logic = new FakeApiLogicHandler();

            var model = VisibleData.GetFirst();
            var profile = UserData.GetFifth();
            profile.ProfileId = model.Id;

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<ImageFile>>())).Returns(null);

            var command = new CheckProfileImage
            {
                DataHandler = data,
                LogicHandler = logic,
                Model = profile
            };

            await command.Execute();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<ImageFile>>()), Times.Once());
        }
    }
}