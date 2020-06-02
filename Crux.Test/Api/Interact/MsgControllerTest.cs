using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Crux.Data.Core.Results;
using System.Collections.Generic;
using Crux.Endpoint.ViewModel.Base;
using Is = NUnit.DeepObjectCompare.Is;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Query;
using Crux.Data.Interact.Result;
using Crux.Endpoint.Api.Interact;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;
using Crux.Test.Api.Interact.Handler;
using Crux.Test.TestData.Interact;

namespace Crux.Test.Api.Interact
{
    [TestFixture]
    public class MsgControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the MsgController Get method With Standard User")]
        public async Task MsgControllerGet()
        {
            var data = new MsgApiDataHandler();
            var model = MsgData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Msg>>())).Returns(model);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(MsgData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as MsgViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.Text.Should().Be(model.Text);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Get method With Admin User")]
        public async Task MsgControllerGetAdmin()
        {
            var data = new MsgApiDataHandler();
            var model = MsgData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Msg>>())).Returns(model);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = AdminUser };
            var result = await controller.Get(MsgData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as MsgViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.Text.Should().Be(model.Text);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Get method with a Null return from load")]
        public async Task MsgControllerGetNull()
        {
            var data = new MsgApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Msg>>())).Returns(null);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(MsgData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Get method with Invalid Tenant User")]
        public async Task MsgControllerGetUnauthorised()
        {
            var data = new MsgApiDataHandler();
            var model = MsgData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Msg>>())).Returns(model);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Get(MsgData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Display method with Admin User")]
        public async Task MsgControllerDisplay()
        {
            var data = new MsgApiDataHandler();
            var display = MsgData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<MsgDisplayById>())).Returns(display);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = AdminUser };
            var result = await controller.Display(MsgData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MsgDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Display method with Null Result")]
        public async Task MsgControllerDisplayNull()
        {
            var data = new MsgApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<MsgDisplayById>())).Returns(null);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = StandardUser };
            var result = await controller.Display(MsgData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MsgDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Display method with Unauthorized Result")]
        public async Task MsgControllerDisplayUnauthorized()
        {
            var data = new MsgApiDataHandler();
            var display = MsgData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<MsgDisplayById>())).Returns(display);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Display(MsgData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MsgDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Filter method with Standard User")]
        public async Task MsgControllerFilter()
        {
            var data = new MsgApiDataHandler();
            var list = new List<MsgDisplay> { MsgData.GetFirstDisplay(false) };
            var filter = new MsgFilter { TenantRestrict = true };

            data.Result.Setup(m => m.Execute(It.IsAny<MsgDisplayByFilter>())).Returns(list);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = StandardUser };
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<MsgDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MsgDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Post method with add")]
        public async Task MsgControllerPostAdd()
        {
            var data = new MsgApiDataHandler();
            var model = MsgData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Msg>>())).Returns(model);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = AdminUser };
            var viewModel = controller.Mapper.Map<MsgViewModel>(model);
            viewModel.Id = string.Empty;
            viewModel.Files = new List<VisibleDisplay>();
            viewModel.Recipients = new List<ResultProfile>() { UserData.GetFirstProfile(), UserData.GetSecondProfile() };
            viewModel.HasReply.Should().BeFalse();
            viewModel.Reply.Should().BeNull();

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Msg>>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Post method with edit")]
        public async Task MsgControllerPostEdit()
        {
            var data = new MsgApiDataHandler();
            var model = MsgData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Msg>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Msg>>())).Returns(model);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = StandardUser };
            var viewModel = controller.Mapper.Map<MsgViewModel>(model);
            viewModel.Files = new List<VisibleDisplay>();
            viewModel.Recipients = new List<ResultProfile>() { UserData.GetFirstProfile(), UserData.GetSecondProfile() };

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Msg>>()), Times.Once());
        }

        [Test(Description = "Tests the MsgController Get method with Invalid Msg")]
        public async Task MsgControllerPostUnauthorised()
        {
            var data = new MsgApiDataHandler();
            var model = MsgData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Msg>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<Msg>>())).Returns(model);

            var controller = new MsgController(data, Cloud, Logic) { CurrentUser = NonTenantUser };
            var viewModel = controller.Mapper.Map<MsgViewModel>(model);
            viewModel.Files = new List<VisibleDisplay>();
            viewModel.Recipients = new List<ResultProfile>() { UserData.GetFirstProfile(), UserData.GetSecondProfile() };

            var result = await controller.Post(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Msg>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Msg>>()), Times.Never);
        }
    }
}