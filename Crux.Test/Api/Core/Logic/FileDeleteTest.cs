using System.Threading.Tasks;
using FluentAssertions;
using Crux.Cloud.Blob;
using Crux.Data.Base;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Base;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class FileDeleteTest : ControllerTest
    {
        [Test(Description = "Tests the FileDelete Logic Command - Image")]
        public async Task FileDeleteLogicImg()
        {
            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new FakeApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Delete<VisibleFile>>())).Returns(true);
            cloud.Result.Setup(m => m.Execute(It.IsAny<DeleteCmd>()))
                .Returns(ActionConfirm.CreateSuccess("File Loaded"));

            var command = new FileDelete
            {
                DataHandler = data,
                File = model,
                CloudHandler = cloud,
                LogicHandler = logic
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Delete<VisibleFile>>()), Times.Once());
        }

        [Test(Description = "Tests the FileDelete Logic Command - Video")]
        public async Task FileDeleteLogicVid()
        {
            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new FakeApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();
            model.IsImage = false;
            model.IsVideo = true;

            data.Result.Setup(m => m.Execute(It.IsAny<Delete<VisibleFile>>())).Returns(true);
            cloud.Result.Setup(m => m.Execute(It.IsAny<DeleteCmd>()))
                .Returns(ActionConfirm.CreateSuccess("File Loaded"));

            var command = new FileDelete
            {
                DataHandler = data,
                File = model,
                CloudHandler = cloud,
                LogicHandler = logic
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Delete<VisibleFile>>()), Times.Once());
        }

        [Test(Description = "Tests the FileDelete Logic Command - Document")]
        public async Task FileDeleteLogicDoc()
        {
            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new FakeApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();
            model.IsImage = false;
            model.IsDocument = true;

            data.Result.Setup(m => m.Execute(It.IsAny<Delete<VisibleFile>>())).Returns(true);
            cloud.Result.Setup(m => m.Execute(It.IsAny<DeleteCmd>()))
                .Returns(ActionConfirm.CreateSuccess("File Loaded"));

            var command = new FileDelete
            {
                DataHandler = data,
                File = model,
                CloudHandler = cloud,
                LogicHandler = logic
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Delete<VisibleFile>>()), Times.Once());
        }

        [Test(Description = "Tests the FileDelete Logic Command - Fail")]
        public async Task FileDeleteLogicFail()
        {
            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new FakeApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var model = VisibleData.GetFirst();

            cloud.Result.Setup(m => m.Execute(It.IsAny<DeleteCmd>()))
                .Returns(ActionConfirm.CreateFailure(("Delete Failed")));

            var command = new FileDelete
            {
                DataHandler = data,
                File = model,
                CloudHandler = cloud,
                LogicHandler = logic
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Delete<VisibleFile>>()), Times.Never());
        }
    }
}