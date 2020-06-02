using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Test.Base;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
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
    public class MeetingTypeControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the MeetingTypeController Get method With Standard User")]
        public async Task MeetingTypeControllerGet()
        {
            var data = new MeetingTypeApiDataHandler();
            var model = MeetingTypeData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<MeetingType>>())).Returns(model);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(MeetingTypeData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Get method With Admin User")]
        public async Task MeetingTypeControllerGetAdmin()
        {
            var data = new MeetingTypeApiDataHandler();
            var model = MeetingTypeData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<MeetingType>>())).Returns(model);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Get(MeetingTypeData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as MeetingTypeViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.DaysWhen.Should().Be(model.DaysWhen);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Get method with a Null return from load")]
        public async Task MeetingTypeControllerGetNull()
        {
            var data = new MeetingTypeApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<MeetingType>>())).Returns(null);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Get(MeetingTypeData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Get method with Invalid Tenant User")]
        public async Task MeetingTypeControllerGetUnauthorised()
        {
            var data = new MeetingTypeApiDataHandler();
            var model = MeetingTypeData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<MeetingType>>())).Returns(model);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Get(MeetingTypeData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Display method with Admin User")]
        public async Task MeetingTypeControllerDisplay()
        {
            var data = new MeetingTypeApiDataHandler();
            var display = MeetingTypeData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingTypeDisplayById>())).Returns(display);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Display(MeetingTypeData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingTypeDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Display method with Null Result")]
        public async Task MeetingTypeControllerDisplayNull()
        {
            var data = new MeetingTypeApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingTypeDisplayById>())).Returns(null);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Display(MeetingTypeData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingTypeDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Display method with Unauthorized Result")]
        public async Task MeetingTypeControllerDisplayUnauthorized()
        {
            var data = new MeetingTypeApiDataHandler();
            var display = MeetingTypeData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingTypeDisplayById>())).Returns(display);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = NonTenantUser };
            var result = await controller.Display(MeetingTypeData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingTypeDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Filter method with Standard User")]
        public async Task MeetingTypeControllerFilter()
        {
            var data = new MeetingTypeApiDataHandler();
            var list = new List<MeetingTypeDisplay> { MeetingTypeData.GetFirstDisplay(false) };
            var filter = new MeetingTypeFilter { TenantRestrict = true };

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingTypeDisplayByFilter>())).Returns(list);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = StandardUser };
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<MeetingTypeDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingTypeDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Ref method with Standard MeetingType")]
        public async Task MeetingTypeControllerRef()
        {
            var data = new MeetingTypeApiDataHandler();
            var list = new List<ResultOwned> { MeetingTypeData.GetFirstOwned() };
            var filter = new MeetingTypeFilter { TenantRestrict = true };

            data.Result.Setup(m => m.Execute(It.IsAny<MeetingTypeRefByFilter>())).Returns(list);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = AdminUser };
            var result = await controller.Ref(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<ResultOwned>>;
            check.Data.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<MeetingTypeRefByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Post method with add")]
        public async Task MeetingTypeControllerPostAdd()
        {
            var data = new MeetingTypeApiDataHandler();
            var model = MeetingTypeData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Persist<MeetingType>>())).Returns(model);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = AdminUser };
            var viewModel = controller.Mapper.Map<MeetingTypeViewModel>(model);
            viewModel.Id = string.Empty;

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<MeetingType>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Post method with edit")]
        public async Task MeetingTypeControllerPostEdit()
        {
            var data = new MeetingTypeApiDataHandler();
            var model = MeetingTypeData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<MeetingType>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<MeetingType>>())).Returns(model);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = AdminUser };
            var viewModel = controller.Mapper.Map<MeetingTypeViewModel>(model);
            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<MeetingType>>()), Times.Once());
        }

        [Test(Description = "Tests the MeetingTypeController Get method with Invalid MeetingType")]
        public async Task MeetingTypeControllerPostUnauthorised()
        {
            var data = new MeetingTypeApiDataHandler();
            var model = MeetingTypeData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<MeetingType>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<MeetingType>>())).Returns(model);

            var controller = new MeetingTypeController(data, Logic) { CurrentUser = StandardUser };
            var viewModel = controller.Mapper.Map<MeetingTypeViewModel>(model);
            var result = await controller.Post(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<MeetingType>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<MeetingType>>()), Times.Never);
        }
    }
}