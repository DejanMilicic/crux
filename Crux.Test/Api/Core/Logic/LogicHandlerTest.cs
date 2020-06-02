using System;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Base;
using Crux.Model.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core.Mock;
using NUnit.Framework;

namespace Crux.Test.Api.Core.Logic
{
    public class LogicHandlerTest : ControllerTest
    {
        [Test(Description = "Tests the LogicHandler init with Standard User")]
        public async Task LogicHandlerTestInit()
        {
            var command = new FakeLogicCommand();
            var logic = new LogicHandler() {User = StandardUser};
            await logic.Execute(command);
        }

        [Test(Description = "Tests the LogicHandler init with Standard User - Data")]
        public async Task LogicHandlerTestInitData()
        {
            var command = new FakeLogicCommand();
            var data = new FakeApiDataEntityHandler<Tenant>();
            var logic = new LogicHandler() {DataHandler = data, User = StandardUser};
            await logic.Execute(command);

            logic.User.Id.Should().Be(StandardUser.Id);
        }

        [Test(Description = "Tests the LogicHandler with Invalid Command")]
        public void LogicHandlerTestInvalid()
        {
            var command = new TenantByEntryKey();
            var logic = new LogicHandler() {User = StandardUser};
            Assert.That(() => logic.Execute(command), Throws.TypeOf<ArgumentException>());
        }
    }
}