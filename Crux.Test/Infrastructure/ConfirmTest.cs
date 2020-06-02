using FluentAssertions;
using Crux.Model.Core.Confirm;
using NUnit.Framework;
using Crux.Model.Core;

namespace Crux.Test.Infrastructure
{
    [TestFixture]
    public class ConfirmTest
    {
        [Test(Description = "Tests the ActionConfirm Success")]
        public void ActionConfirmTestSuccess()
        {
            var msg = ActionConfirm.CreateSuccess("Message");
            msg.Message.Should().Be("Message");

            var obj = ActionConfirm.CreateSuccess(new Tenant());
            obj.Value.Should().NotBeNull();

            msg.Success.Should().BeTrue();
            obj.Success.Should().BeTrue();
        }

        [Test(Description = "Tests the ActionConfirm Failure")]
        public void ActionConfirmTestFailure()
        {
            var msg = ActionConfirm.CreateFailure("Message");
            msg.Message.Should().Be("Message");

            msg.Success.Should().BeFalse();
        }

        [Test(Description = "Tests the ModelConfirm Success")]
        public void ModelConfirmTestSuccess()
        {
            var msg = ModelConfirm<Tenant>.CreateSuccess(new Tenant());

            msg.Success.Should().BeTrue();

            var model = msg.Model;
            model.Should().NotBeNull();
        }

        [Test(Description = "Tests the ModelConfirm Failure")]
        public void ModelConfirmTestFailure()
        {
            var msg = ModelConfirm<Tenant>.CreateFailure("Message");
            msg.Message.Should().Be("Message");

            msg.Success.Should().BeFalse();
        }
    }
}