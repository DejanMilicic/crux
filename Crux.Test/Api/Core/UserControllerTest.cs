using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Data.Core.Query;
using Crux.Endpoint.Api.Core;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Core;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Crux.Data.Core.Results;
using System.Collections.Generic;
using Crux.Data.Core.Filters;
using Crux.Endpoint.ViewModel.Base;
using Is = NUnit.DeepObjectCompare.Is;
using Crux.Data.Base.Results;

namespace Crux.Test.Api.Core
{
    [TestFixture]
    public class UserControllerTest : ControllerTest
    {
        protected FakeApiLogicHandler Logic { get; set; } = new FakeApiLogicHandler();

        [Test(Description = "Tests the UserController Get method With Standard User")]
        public async Task UserControllerGet()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Get(UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as UserViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.Email.Should().Be(model.Email);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Get method With Admin User")]
        public async Task UserControllerGetAdmin()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = AdminUser};
            var result = await controller.Get(UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            var viewModel = result.Value as UserViewModel;
            viewModel.Id.Should().Be(model.Id);
            viewModel.Name.Should().Be(model.Name);
            viewModel.Email.Should().Be(model.Email);

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Get method with a Null return from load")]
        public async Task UserControllerGetNull()
        {
            var data = new UserApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(null);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Get(UserData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Get method with Invalid Tenant User")]
        public async Task UserControllerGetUnauthorised()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = NonTenantUser};
            var result = await controller.Get(UserData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Display method with Standard User")]
        public async Task UserControllerDisplay()
        {
            var data = new UserApiDataHandler();
            var display = UserData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<UserDisplayById>())).Returns(display);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Display(UserData.FirstId) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(display));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Display method with Null Result")]
        public async Task UserControllerDisplayNull()
        {
            var data = new UserApiDataHandler();

            data.Result.Setup(m => m.Execute(It.IsAny<UserDisplayById>())).Returns(null);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Display(UserData.FirstId) as NotFoundResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<NotFoundResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Display method with Unauthorized Result")]
        public async Task UserControllerDisplayUnauthorized()
        {
            var data = new UserApiDataHandler();
            var display = UserData.GetFirstDisplay(false);

            data.Result.Setup(m => m.Execute(It.IsAny<UserDisplayById>())).Returns(display);

            var controller = new UserController(data, Logic) {CurrentUser = NonTenantUser};
            var result = await controller.Display(UserData.FirstId) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserDisplayById>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Filter method with Admin User")]
        public async Task UserControllerFilter()
        {
            var data = new UserApiDataHandler();
            var list = new List<UserDisplay> {UserData.GetFirstDisplay(false)};
            var filter = new UserFilter {TenantRestrict = true};

            data.Result.Setup(m => m.Execute(It.IsAny<UserDisplayByFilter>())).Returns(list);

            var controller = new UserController(data, Logic) {CurrentUser = AdminUser};
            var result = await controller.Filter(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<UserDisplay>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);
            check.Success.Should().BeTrue();
            check.Paging.Should().NotBeNull();
            check.Message.Should().BeNullOrEmpty();

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserDisplayByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Ref method with Standard User")]
        public async Task UserControllerRef()
        {
            var data = new UserApiDataHandler();
            var list = new List<ResultProfile> {UserData.GetFirstProfile()};
            var filter = new UserFilter {TenantRestrict = true};

            data.Result.Setup(m => m.Execute(It.IsAny<UserRefByFilter>())).Returns(list);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Ref(filter) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as PagedResult<IEnumerable<ResultProfile>>;
            check.Should().NotBeNull();
            check.Data.Count().Should().Be(list.Count);

            Assert.That(check.Data, Is.DeepEqualTo(list));

            data.HasExecuted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<UserRefByFilter>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Filter method with Unauthorized User")]
        public async Task UserControllerFilterUnauthorized()
        {
            var data = new UserApiDataHandler();
            var filter = new UserFilter {TenantRestrict = true};

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var result = await controller.Filter(filter) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserDisplayByFilter>()), Times.Never());
        }

        [Test(Description = "Tests the UserController Post method with add")]
        public async Task UserControllerPostAdd()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();


            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = AdminUser};
            var viewModel = controller.Mapper.Map<UserViewModel>(model);
            viewModel.Id = string.Empty;
            viewModel.Password = "pa$$word";

            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Post method with edit")]
        public async Task UserControllerPostEdit()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = AdminUser};
            var viewModel = controller.Mapper.Map<UserViewModel>(model);
            var result = await controller.Post(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Identity.Should().Be(model.Id);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Get method with Invalid User")]
        public async Task UserControllerPostUnauthorised()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = NonTenantUser};
            var viewModel = controller.Mapper.Map<UserViewModel>(model);
            var result = await controller.Post(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.AtLeastOnce);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Never);
        }

        [Test(Description = "Tests the UserController Reset method")]
        public async Task UserControllerReset()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var viewModel = new ResetPwdViewModel()
                {Current = UserData.FirstPwd, Id = UserData.FirstId, Replacement = "bollocks"};
            var result = await controller.Reset(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeTrue();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Once());
        }

        [Test(Description = "Tests the UserController Reset method - with unauthorized")]
        public async Task UserControllerResetUnauth()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var viewModel = new ResetPwdViewModel()
                {Current = UserData.FirstPwd, Id = UserData.SecondId, Replacement = "bollocks"};
            var result = await controller.Reset(viewModel) as UnauthorizedResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();

            data.HasExecuted.Should().BeFalse();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Never);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Never());
        }

        [Test(Description = "Tests the UserController Reset method - with wrong password")]
        public async Task UserControllerResetBadPwd()
        {
            var data = new UserApiDataHandler();
            var model = UserData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<Loader<User>>())).Returns(model);
            data.Result.Setup(m => m.Execute(It.IsAny<Persist<User>>())).Returns(model);

            var controller = new UserController(data, Logic) {CurrentUser = StandardUser};
            var viewModel = new ResetPwdViewModel()
                {Current = "wrong", Id = UserData.FirstId, Replacement = "bollocks"};
            var result = await controller.Reset(viewModel) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().NotBeNull();

            var check = result.Value as ConfirmViewModel;
            check.Success.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<User>>()), Times.Once);
            data.Result.Verify(s => s.Execute(It.IsAny<Persist<User>>()), Times.Never());
        }
    }
}