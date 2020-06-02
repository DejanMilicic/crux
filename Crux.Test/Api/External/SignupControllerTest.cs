using System.Threading.Tasks;
using Crux.Data.Base;
using FluentAssertions;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.Api.External;
using Crux.Endpoint.Api.External.Logic;
using Crux.Endpoint.ViewModel.Core;
using Crux.Endpoint.ViewModel.External;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Api.Core.Handler;
using Crux.Test.Api.External.Handler;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.External;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Api.External
{
    [TestFixture]
    public class SignupControllerTest : ControllerTest
    {
        protected FakeCloudHandler Cloud { get; set; } = new FakeCloudHandler();

        [Test(Description = "Tests the SignupController Entry method")]
        public async Task SignupControllerAuthTest()
        {
            var data = new SignupDataHandler();
            var logic = new CoreApiLogicHandler();
            var entry = SignupData.GetEntry();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantByEntryKey>())).Returns(TenantData.GetFirst());

            var controller = new SignupController(data, Cloud, logic);
            var result = await controller.Entry(entry) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            Assert.That(result.Value, Is.DeepEqualTo(entry));

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantByEntryKey>()), Times.Once);
        }

        [Test(Description = "Tests the SignupController Entry method - Fail")]
        public async Task SignupControllerAuthTestFail()
        {
            var data = new SignupDataHandler();
            var logic = new CoreApiLogicHandler();
            var entry = SignupData.GetEntry();

            data.Result.Setup(m => m.Execute(It.IsAny<TenantByEntryKey>())).Returns(null);

            var controller = new SignupController(data, Cloud, logic);
            var result = await controller.Entry(entry) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            result.Value.Should().BeOfType<FailViewModel>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<TenantByEntryKey>()), Times.Once);
        }

        [Test(Description = "Tests the SignupController Post method")]
        public async Task SignupControllerPostTest()
        {
            var data = new SignupDataHandler();
            var logic = new CoreApiLogicHandler();
            
            var signup = SignupData.GetSignup();
            var auth = LoginData.GetAuth();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(null);
            logic.Result.Setup(m => m.Execute(It.IsAny<SignupUser>())).Returns(ActionConfirm.CreateSuccess(auth));

            var controller = new SignupController(data, Cloud, logic);
            var result = await controller.Post(signup) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeTrue();
            logic.Result.Verify(s => s.Execute(It.IsAny<SignupUser>()), Times.Once);

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

        [Test(Description = "Tests the SignupController Post method - Exists")]
        public async Task SignupControllerPostTestExists()
        {
            var data = new SignupDataHandler();
            var logic = new CoreApiLogicHandler();

            var signup = SignupData.GetSignup();

            data.Result.Setup(m => m.Execute(It.IsAny<UserByEmail>())).Returns(StandardUser);

            var controller = new SignupController(data, Cloud, logic);
            var result = await controller.Post(signup) as OkObjectResult;
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();

            logic.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<UserByEmail>()), Times.Once);
        }

    }
}