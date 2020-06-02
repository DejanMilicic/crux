using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Persist;
using Crux.Data.Core.Query;
using Crux.Data.Core.Results;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class TenantControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the TenantController Get method With Standard User")]
        public async Task TenantControllerGet()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);

            var controller = new TenantController(data, Logic) {CurrentUser = AdminUser};
            var result = await controller.Get(TenantData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as TenantViewModel;
            check.ProfileId.Should().Be(model.ProfileId);
            check.ProfileThumbUrl.Should().Be(model.ProfileThumbUrl);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
        }

        [Test(Description = "Tests the TenantController Get method With NonTenant User")]
        public async Task TenantControllerGetFail()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);

            var controller = new TenantController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Get(TenantData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
        }

        [Test(Description = "Tests the TenantController Post method With Super User")]
        public async Task TenantControllerPost()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<TenantSave>())).Returns(model);

            var controller = new TenantController(data, Logic) {CurrentUser = SuperUser};
            var viewModel = controller.Mapper.Map<TenantViewModel>(model);
            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantSave>()), Times.Once);
        }

        [Test(Description = "Tests the TenantController Post method with Empty Id")]
        public async Task TenantControllerPostEmpty()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantSave>())).Returns(model);

            var controller = new TenantController(data, Logic) {CurrentUser = SuperUser};
            var viewModel = controller.Mapper.Map<TenantViewModel>(model);
            viewModel.Id = string.Empty;
            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<TenantSave>()), Times.Once);
        }

        [Test(Description = "Tests the TenantController Post method With Standard User")]
        public async Task TenantControllerPostUnauthorized()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<TenantSave>())).Returns(model);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var viewModel = controller.Mapper.Map<TenantViewModel>(model);
            var result = await controller.Post(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();

            data.Result.Verify(s => s.Execute(It.IsAny<TenantSave>()), Times.Never);
        }

        [Test(Description = "Tests the TenantController Delete method With Super User")]
        public async Task TenantControllerDelete()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<TenantDelete>())).Returns(true);

            var controller = new TenantController(data, Logic) {CurrentUser = SuperUser};
            var result = await controller.Delete(TenantData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDelete>()), Times.Once);
        }

        [Test(Description = "Tests the TenantController Delete method with NotFound")]
        public async Task TenantControllerDeleteNotFound()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(null);
            data.Result.Setup(m => m.Execute(It.IsAny<TenantDelete>())).Returns(false);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Delete(TenantData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDelete>()), Times.Never);
        }

        [Test(Description = "Tests the TenantController Delete method with Unauth")]
        public async Task TenantControllerDeleteUnauth()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<TenantDelete>())).Returns(false);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Delete(TenantData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDelete>()), Times.Never);
        }

        [Test(Description = "Tests the TenantController Delete method with Failed")]
        public async Task TenantControllerDeleteFailed()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<TenantDelete>())).Returns(false);

            var controller = new TenantController(data, Logic) {CurrentUser = SuperUser};
            var result = await controller.Delete(TenantData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDelete>()), Times.Once);
        }

        [Test(Description = "Tests the TenantController Delete method With Standard User")]
        public async Task TenantControllerDeleteUnauthorized()
        {
            var data = new FakeApiDataEntityHandler<Tenant>();
            var model = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(model);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Delete(TenantData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<Tenant>>()), Times.Never);
        }

        [Test(Description = "Tests the TenantController Display method with Standard User")]
        public async Task TenantControllerDisplay()
        {
            var data = new FakeApiDataResultHandler<Tenant, TenantDisplay>();
            var display = TenantData.GetFirstDisplay();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantDisplayById>())).Returns(display);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Display(TenantData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the TenantController Display method with Null Result")]
        public async Task TenantControllerDisplayNull()
        {
            var data = new FakeApiDataResultHandler<Tenant, TenantDisplay>();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantDisplayById>())).Returns(null);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Display(TenantData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the TenantController Display method with Unauthorized Result")]
        public async Task TenantControllerDisplayUnauthorized()
        {
            var data = new FakeApiDataResultHandler<Tenant, TenantDisplay>();
            var display = TenantData.GetFirstDisplay();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantDisplayById>())).Returns(display);

            var controller = new TenantController(data, Logic) {CurrentUser = NonTenantUser};
            var result = await controller.Display(TenantData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserDisplayById>()), Times.Never());
        }

        [Test(Description = "Tests the UserController Filter method with Super User")]
        public async Task UserControllerFilter()
        {
            var data = new FakeApiDataResultHandler<Tenant, TenantDisplay>();
            var list = new List<TenantDisplay> {TenantData.GetFirstDisplay()};
            var filter = new TenantFilter {TenantRestrict = true};

            data.Result.Setup(m => m.Execute(It.IsAny<TenantDisplayByFilter>())).Returns(list);

            var controller = new TenantController(data, Logic) {CurrentUser = SuperUser};
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<TenantDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Filter method with Standard User")]
        public async Task UserControllerFilterUnauth()
        {
            var data = new FakeApiDataResultHandler<Tenant, TenantDisplay>();
            var list = new List<TenantDisplay> {TenantData.GetFirstDisplay()};
            var filter = new TenantFilter {TenantRestrict = true};

            data.Result.Setup(m => m.Execute(It.IsAny<TenantDisplayByFilter>())).Returns(list);

            var controller = new TenantController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Filter(filter) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantDisplayByFilter>()), Times.Never());
        }
    }
}