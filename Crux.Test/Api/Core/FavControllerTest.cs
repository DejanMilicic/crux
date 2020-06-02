using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Endpoint.Api.Core;
using Crux.Model.Core;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Crux.Data.Core.Persist;
using Crux.Model.Core.Confirm;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class FavControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the FavController Add method With Standard User - Exists")]
        public async Task FavControllerAddFailure()
        {
            var data = new FavApiDataHandler();
            var model = FavData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<FavAdd>())).Returns(model);
            data.Confirm = ModelConfirm<Fav>.CreateFailure("Already Exists");

            var controller = new FavController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Add("user", UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().Be(true);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<FavAdd>()), Times.Once);
        }

        [Test(Description = "Tests the FavController Add method With Standard User - New")]
        public async Task FavControllerAddNew()
        {
            var data = new FavApiDataHandler();
            var model = FavData.GetFirst();
            model.EntityIds = new List<string>();

            data.Result.Setup(m => m.Execute(It.IsAny<FavAdd>())).Returns(null);
            data.Confirm = ModelConfirm<Fav>.CreateSuccess(model);

            var controller = new FavController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Add("user", UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().Be(true);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<FavAdd>()), Times.Once);
        }

        [Test(Description = "Tests the FavController Remove method With Standard User - Exists")]
        public async Task FavControllerRemoveExists()
        {
            var data = new FavApiDataHandler();
            var model = FavData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<FavRemove>())).Returns(model);
            data.Confirm = ModelConfirm<Fav>.CreateSuccess(model);

            var controller = new FavController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Remove("user", UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().Be(false);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<FavRemove>()), Times.Once);
        }

        [Test(Description = "Tests the FavController Remove method With Standard User - Missing")]
        public async Task FavControllerRemoveMissing()
        {
            var data = new FavApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<FavRemove>())).Returns(null);
            data.Confirm = ModelConfirm<Fav>.CreateFailure("Does not exist");

            var controller = new FavController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Remove("user", UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().Be(false);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<FavRemove>()), Times.Once);
        }
    }
}