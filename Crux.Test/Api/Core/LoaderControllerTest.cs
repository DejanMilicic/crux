using System.Threading.Tasks;
using FluentAssertions;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Crux.Cloud.Media;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class LoaderControllerTest : ControllerTest
    {
        protected VisibleApiDataHandler Data { get; set; } = new VisibleApiDataHandler();
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the LoaderController Upload method With Standard User")]
        public async Task LoaderControllerUploadSuccess()
        {
            var data = new VisibleApiDataHandler();
            var logic = new CoreApiLogicHandler();
            var model = VisibleData.GetFirst();

            logic.Result.Setup(m => m.Execute(It.IsAny<ProcessFile>())).Returns(ActionConfirm.CreateSuccess(model));

            var controller = new LoaderController(data, Cloud, logic) {CurrentUser = StandardUser};
            var result = await controller.Upload(VisibleData.GetFile()) as JsonResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<JsonResult>();

            data.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeTrue();
        }

        [Test(Description = "Tests the LoaderController Upload method With Standard User - NotFound")]
        public async Task LoaderControllerUploadNotFound()
        {
            var data = new VisibleApiDataHandler();
            var logic = new CoreApiLogicHandler();
            var model = VisibleData.GetFirst();

            logic.Result.Setup(m => m.Execute(It.IsAny<ProcessFile>()))
                .Returns(ActionConfirm.CreateFailure("Something went wrong"));

            var controller = new LoaderController(data, Cloud, logic) {CurrentUser = StandardUser};
            var result = await controller.Upload(VisibleData.GetFile()) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeTrue();
        }

        [Test(Description = "Tests the LoaderController Gif method With Standard User - Success")]
        public async Task LoaderControllerGiphySuccess()
        {
            var cloud = new FakeCloudHandler();

            cloud.Result.Setup(m => m.Execute(It.IsAny<GiphyCmd>()))
                .Returns(ActionConfirm.CreateSuccess("https://image.com/img.png"));

            var controller = new LoaderController(Data, cloud, Logic) {CurrentUser = StandardUser};
            var result = await controller.Gif(UserData.FirstId) as JsonResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<JsonResult>();

            cloud.HasExecuted.Should().BeTrue();
        }

        [Test(Description = "Tests the LoaderController Gif method With Standard User - Failure")]
        public async Task LoaderControllerGiphyFail()
        {
            var cloud = new FakeCloudHandler();

            cloud.Result.Setup(m => m.Execute(It.IsAny<GiphyCmd>()))
                .Returns(ActionConfirm.CreateFailure("Something went wrong"));

            var controller = new LoaderController(Data, cloud, Logic) {CurrentUser = StandardUser};
            var result = await controller.Gif(UserData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            cloud.HasExecuted.Should().BeTrue();
        }

        [Test(Description = "Tests the LoaderController Giffy method With Standard User")]
        public async Task LoaderControllerGiffy()
        {
            var data = new VisibleApiDataHandler();
            var logic = new CoreApiLogicHandler();
            var model = VisibleData.GetFirst();

            logic.Result.Setup(m => m.Execute(It.IsAny<ProcessFile>())).Returns(ActionConfirm.CreateSuccess(model));

            var controller = new LoaderController(data, Cloud, logic) {CurrentUser = StandardUser};
            var result = await controller.Upload(VisibleData.GetFile()) as JsonResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<JsonResult>();

            data.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeTrue();
        }
    }
}