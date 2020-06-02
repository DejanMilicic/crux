using System.Threading.Tasks;
using FluentAssertions;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Base;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core.Mock;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class ProcessFileTest : ControllerTest
    {
        [Test(Description = "Tests the ProcessFile Logic Command - Image")]
        public async Task ProcessFileLogicImg()
        {
            var file = new FakeFile();

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            logic.Result.Setup(m => m.Execute(It.IsAny<ProcessImage>()))
                .Returns(ActionConfirm.CreateSuccess("File Processed"));

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Once());
        }

        [Test(Description = "Tests the ProcessFile Logic Command - Image No Tag")]
        public async Task ProcessFileLogicImgNoTag()
        {
            var file = new FakeFile {ContentType = string.Empty};

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            logic.Result.Setup(m => m.Execute(It.IsAny<ProcessImage>()))
                .Returns(ActionConfirm.CreateSuccess("File Processed"));

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Once());
        }

        [Test(Description = "Tests the ProcessFile Logic Command - Video")]
        public async Task ProcessFileLogicVid()
        {
            var file = new FakeFile {ContentType = "video", FileName = "vid.mp4"};

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Never());
        }

        [Test(Description = "Tests the ProcessFile Logic Command - Video No Tag")]
        public async Task ProcessFileLogicVidNoTag()
        {
            var file = new FakeFile {ContentType = string.Empty, FileName = "vid.mp4"};

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Never());
        }

        [Test(Description = "Tests the ProcessFile Logic Command - Document")]
        public async Task ProcessFileLogicDoc()
        {
            var file = new FakeFile {ContentType = "word", FileName = "powerpoint.docx"};

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Never());
        }

        [Test(Description = "Tests the ProcessFile Logic Command - Document No Tag")]
        public async Task ProcessFileLogicDocNoTag()
        {
            var file = new FakeFile {ContentType = string.Empty, FileName = "powerpoint.docx"};

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Never());
        }

        [Test(Description = "Tests the ProcessFile Logic Command - Fail")]
        public async Task ProcessFileLogicFail()
        {
            var file = new FakeFile();

            var data = new FakeApiDataEntityHandler<VisibleFile>();
            var logic = new CoreApiLogicHandler();
            var cloud = new FakeCloudHandler();

            logic.Result.Setup(m => m.Execute(It.IsAny<ProcessImage>()))
                .Returns(ActionConfirm.CreateFailure("Failed to Process"));

            var command = new ProcessFile
            {
                DataHandler = data,
                Source = file,
                CloudHandler = cloud,
                LogicHandler = logic,
                CurrentUser = StandardUser
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeFalse();
            logic.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            logic.Result.Verify(s => s.Execute(It.IsAny<ProcessImage>()), Times.Once());
        }
    }
}