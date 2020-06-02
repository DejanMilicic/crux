using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Core;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class NoteControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the NoteController Get method With Standard User - No Notable")]
        public async Task NoteControllerGetNoNotable()
        {
            var data = new NoteApiDataHandler();
            var master = NoteData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(null);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(NoteData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once());
        }

        [Test(Description = "Tests the NoteController Get method With Standard User - Exists False")]
        public async Task NoteControllerGetExistsFalse()
        {
            var model = NoteData.GetFirst();
            var master = UserData.GetFirst();
            var data = new NoteApiDataHandler() { ResultNotable = master };

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(null);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Notes>>())).Returns(model);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(NoteData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().BeOfType<NotableViewModel>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once());
        }

        [Test(Description = "Tests the NoteController Get method With Standard User - Exists True")]
        public async Task NoteControllerGetExistsTrue()
        {
            var model = NoteData.GetFirst();
            var master = UserData.GetFirst();
            var data = new NoteApiDataHandler() { ResultNotable = master };

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(model);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(NoteData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().BeOfType<NotableViewModel>();
            
            var check = result.Value as NotableViewModel;
            check.Should().NotBeNull();
            check.Notable.Should().NotBeNull();
            check.Message.Should().BeNull();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once());
        }

        [Test(Description = "Tests the FavController Get method With Standard User - Not Found")]
        public async Task NoteControllerGetNotFound()
        {
            var data = new NoteApiDataHandler();

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(NoteData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
        }

        [Test(Description = "Tests the NoteController Post method with add")]
        public async Task NoteControllerPostAdd()
        {
            var data = new NoteApiDataHandler();
            var model = NoteData.GetFirst();

            var viewModel = new NoteViewModel { Id = NoteData.FirstId, Text = "New Note" };

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Notes>>())).Returns(model);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as NotableViewModel;
            check.Notes.Name.Should().Be(model.Name);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Notes>>()), Times.Once());
        }

        [Test(Description = "Tests the NoteController Post method with add existing")]
        public async Task NoteControllerPostAddExisting()
        {
            var data = new NoteApiDataHandler();
            var model = NoteData.GetFirst();
            model.History.Add(new Note() { Counter = 1 });

            var viewModel = new NoteViewModel { Id = NoteData.FirstId, Text = "New Note", Counter = 1, IsPrivate = false, ForceNotify = false};

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Notes>>())).Returns(model);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as NotableViewModel;
            check.Notes.Name.Should().Be(model.Name);
            check.Notes.History.Count().Should().Be(2);

            viewModel.ForceNotify.Should().BeFalse();
            viewModel.IsPrivate.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Notes>>()), Times.Once());
        }

        [Test(Description = "Tests the NoteController Post method with NotFound")]
        public async Task NoteControllerPostNotFound()
        {
            var data = new NoteApiDataHandler();
            var viewModel = new NoteViewModel();

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Post(viewModel) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Notes>>()), Times.Never());
        }

        [Test(Description = "Tests the NoteController Delete method")]
        public async Task NoteControllerPostDelete()
        {
            var data = new NoteApiDataHandler();
            var model = NoteData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Notes>>())).Returns(model);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Delete(NoteData.FirstId, "0") as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as NotableViewModel;
            check.Notes.Name.Should().Be(model.Name);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Notes>>()), Times.Once());
        }

        [Test(Description = "Tests the NoteController Delete method with NotFound")]
        public async Task NoteControllerPostDeleteNotFound()
        {
            var data = new NoteApiDataHandler();
            var model = NoteData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<NotesByRefId>())).Returns(null);

            var controller = new NoteController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Delete(NoteData.FirstId, "0") as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<NotesByRefId>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Notes>>()), Times.Never());
        }
    }
}