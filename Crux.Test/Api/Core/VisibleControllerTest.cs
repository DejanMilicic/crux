using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Query;
using Crux.Data.Core.Results;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Base;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
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
    public class VisibleControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the VisibleController Display method With Standard User")]
        public async Task VisibleControllerDisplay()
        {
            var data = new VisibleApiDataHandler();
            var display = VisibleData.GetFirstDisplay();

            data.Result.Setup(m => m.Execute(It.IsAny<VisibleDisplayById>())).Returns(display);

            var controller = new VisibleController(data, Cloud, Logic) {CurrentUser = StandardUser};
            var result = await controller.Display(VisibleData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<VisibleDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the VisibleController Display method With Standard User - NotFound")]
        public async Task VisibleControllerDisplayNotFound()
        {
            var data = new VisibleApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<VisibleDisplayById>())).Returns(null);

            var controller = new VisibleController(data, Cloud, Logic) {CurrentUser = StandardUser};
            var result = await controller.Display(VisibleData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<VisibleDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the VisibleController Display method With Standard User - Unauthorized")]
        public async Task VisibleControllerDisplayUnauthorized()
        {
            var data = new VisibleApiDataHandler();
            var display = VisibleData.GetFirstDisplay();

            data.Result.Setup(m => m.Execute(It.IsAny<VisibleDisplayById>())).Returns(display);

            var controller = new VisibleController(data, Cloud, Logic) {CurrentUser = NonTenantUser};
            var result = await controller.Display(VisibleData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<VisibleDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the VisibleController Filter method with Standard User")]
        public async Task VisibleControllerFilter()
        {
            var data = new VisibleApiDataHandler();
            var list = new List<VisibleDisplay> {VisibleData.GetFirstDisplay()};
            var filter = new VisibleFilter {TenantRestrict = true};

            data.Result.Setup(m => m.Execute(It.IsAny<VisibleDisplayByFilter>())).Returns(list);

            var controller = new VisibleController(data, Cloud, Logic) {CurrentUser = StandardUser};
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<VisibleDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<VisibleDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the VisibleController Filter method with Unauthorized User - meaningless")]
        public async Task VisibleControllerFilterUnauthorized()
        {
            var data = new VisibleApiDataHandler();
            var filter = new VisibleFilter {TenantRestrict = false};

            data.Result.Setup(m => m.Execute(It.IsAny<VisibleDisplayByFilter>())).Returns(new List<VisibleDisplay>());

            var controller = new VisibleController(data, Cloud, Logic) {CurrentUser = NonTenantUser};
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var check = result.Value as PagedResult<IEnumerable<VisibleDisplay>>;
            check.Data.Count().Should().Be(0);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<VisibleDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the VisibleController Delete method With Standard User")]
        public async Task VisibleControllerDelete()
        {
            var data = new VisibleApiDataHandler();
            var logic = new CoreApiLogicHandler();
            var model = VisibleData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<VisibleFile>>())).Returns(model);

            logic.Result.Setup(m => m.Execute(It.IsAny<FileDelete>())).Returns(ActionConfirm.CreateSuccess(model));

            var controller = new VisibleController(data, Cloud, logic) {CurrentUser = StandardUser};
            var result = await controller.Delete(VisibleData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);
            check.Success.Should().BeTrue();

            logic.Result.Verify(s => s.Execute(It.IsAny<FileDelete>()), Times.Once());

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<VisibleFile>>()), Times.Once);
        }

        [Test(Description = "Tests the VisibleController Delete method With Unauthorized")]
        public async Task VisibleControllerDeleteUnauthorized()
        {
            var data = new VisibleApiDataHandler();
            var model = VisibleData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<VisibleFile>>())).Returns(model);

            var controller = new VisibleController(data, Cloud, Logic) {CurrentUser = NonTenantUser};
            var result = await controller.Delete(VisibleData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<VisibleFile>>()), Times.Once);
        }

        [Test(Description = "Tests the VisibleController Delete method With No Success")]
        public async Task VisibleControllerDeleteFailed()
        {
            var data = new VisibleApiDataHandler();
            var logic = new CoreApiLogicHandler();
            var model = VisibleData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<VisibleFile>>())).Returns(model);

            logic.Result.Setup(m => m.Execute(It.IsAny<FileDelete>()))
                .Returns(ActionConfirm.CreateFailure("It went wrong"));

            var controller = new VisibleController(data, Cloud, logic) {CurrentUser = StandardUser};
            var result = await controller.Delete(VisibleData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeFalse();

            logic.Result.Verify(s => s.Execute(It.IsAny<FileDelete>()), Times.Once());

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<VisibleFile>>()), Times.Once);
        }
    }
}