using System.Threading.Tasks;
using FluentAssertions;
using Crux.Cloud.Blob;
using Crux.Data.Base;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Core.Mock;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class ProcessImageTest : ControllerTest
    {
        [Test(Description = "Tests the ProcessImage Logic Command - New")]
        [TestCase("400-square.png")]
        [TestCase("2000-wide.png")]
        [TestCase("2000-high.png")]
        public async Task ProcessImageLogicNew(string fileName)
        {
            var file = new FakeFile() {FileName = fileName};

            var data = new FakeApiDataEntityHandler<ImageFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<ImageFile>>())).Returns(model);
            cloud.Result.Setup(m => m.Execute(It.IsAny<UploadCmd>()))
                .Returns(ActionConfirm.CreateSuccess("File Uploaded"));

            var command = new ProcessImage
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser,
                Model = model,
                LoadType = "test"
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();
            cloud.Result.Verify(s => s.Execute(It.IsAny<UploadCmd>()), Times.AtLeastOnce());

            command.Result.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<ImageFile>>()), Times.Once());
        }

        [Test(Description = "Tests the ProcessImage Logic Command - Exists")]
        public async Task ProcessImageLogicExists()
        {
            var file = new FakeFile();

            var data = new FakeApiDataEntityHandler<ImageFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<ImageFile>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<ImageFile>>())).Returns(model);
            cloud.Result.Setup(m => m.Execute(It.IsAny<UploadCmd>()))
                .Returns(ActionConfirm.CreateSuccess("File Uploaded"));

            var command = new ProcessImage
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser,
                Model = model,
                LoadType = "test",
                ExistingId = model.Id
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();
            cloud.Result.Verify(s => s.Execute(It.IsAny<UploadCmd>()), Times.AtLeastOnce());

            command.Result.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<ImageFile>>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<ImageFile>>()), Times.Once());
        }

        [Test(Description = "Tests the ProcessImage Logic Command - Missing")]
        public async Task ProcessImageLogicMissing()
        {
            var file = new FakeFile() {FileName = "xxxMissingxxx"};

            var data = new FakeApiDataEntityHandler<ImageFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();

            var command = new ProcessImage
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser,
                Model = model,
                LoadType = "test"
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            cloud.Result.Verify(s => s.Execute(It.IsAny<UploadCmd>()), Times.Never());

            command.Result.Success.Should().BeFalse();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<ImageFile>>()), Times.Never());
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<ImageFile>>()), Times.Never());
        }
    }
}