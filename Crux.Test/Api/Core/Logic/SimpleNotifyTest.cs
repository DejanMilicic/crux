using System.Threading.Tasks;
using FluentAssertions;
using Crux.Cloud.Engage;
using Crux.Data.Base;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class SimpleNotifyTest : ControllerTest
    {
        [Test(Description = "Tests the SimpleNotify Logic Command on Signup")]
        public async Task SimpleNotifyLogicSignup()
        {
            var data = new FakeApiDataEntityHandler<NotifyTemplate>();
            var logic = new FakeApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var template = NotifyTemplateData.GetFirst();
            var tenant = TenantData.GetFirst();
            var config = UserConfigData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<NotifyTemplateByName>())).Returns(template);
            data.Result.Setup(m => m.Execute(It.IsAny<Loader<Tenant>>())).Returns(tenant);
            data.Result.Setup(m => m.Execute(It.IsAny<Loader<UserConfig>>())).Returns(config);
            cloud.Result.Setup(m => m.Execute(It.IsAny<EmailTemplateCmd>()))
                .Returns(ActionConfirm.CreateSuccess("Sent"));

            var command = new SimpleNotify
            {
                DataHandler = data,
                CurrentUser = StandardUser,
                TemplateName = "signup",
                CloudHandler = cloud,
                LogicHandler = logic,
                Model = tenant
            };

            await command.Execute();

            cloud.HasExecuted.Should().BeTrue();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<NotifyTemplateByName>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Once());
        }

        [Test(Description = "Tests the SimpleNotify Logic Command on Missing Template")]
        public async Task SimpleNotifyLogicSignupMissingTemplate()
        {
            var data = new FakeApiDataEntityHandler<NotifyTemplate>();
            var logic = new FakeApiLogicHandler();
            var cloud = new FakeCloudHandler();

            var template = NotifyTemplateData.GetFirst();
            var tenant = TenantData.GetFirst();

            data.Result.Setup(m => m.Execute(It.IsAny<NotifyTemplateByName>())).Returns(null);

            var command = new SimpleNotify
            {
                DataHandler = data,
                CurrentUser = StandardUser,
                TemplateName = "signup",
                CloudHandler = cloud,
                LogicHandler = logic,
                Model = tenant,
                Result = ActionConfirm.CreateFailure("It failed")
            };

            await command.Execute();

            command.Result.Success.Should().BeFalse();

            cloud.HasExecuted.Should().BeFalse();

            data.HasExecuted.Should().BeTrue();
            data.HasCommitted.Should().BeFalse();
            data.Result.Verify(s => s.Execute(It.IsAny<NotifyTemplateByName>()), Times.Once());
            data.Result.Verify(s => s.Execute(It.IsAny<Loader<Tenant>>()), Times.Never());
        }
    }
}