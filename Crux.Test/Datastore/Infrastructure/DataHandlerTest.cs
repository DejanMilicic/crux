using System;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Data.Core.Persist;
using Crux.Model.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Core.Mock;
using NUnit.Framework;
using Raven.Client.Documents;

namespace Crux.Test.Datastore.Infrastructure
{
    public class DataHandlerTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            using var session = store.OpenSession();
            session.Store(TenantData.GetFirst());
            session.SaveChanges();
        }

        [Test(Description = "Tests the Data Handler Init")]
        public async Task DataHandlerTestInit()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var command = new Loader<Tenant> {Id = TenantData.FirstId};

            var handler = new DataHandler(session);
            await handler.Execute(command);

            command.Result.Should().NotBeNull();
        }

        [Test(Description = "Tests the Data Handler Commit")]
        public async Task DataHandlerTestCommit()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var handler = new DataHandler(session);
            await handler.Commit();
        }

        [Test(Description = "Tests the Data Handler Invalid Command")]
        public void DataHandlerTestInvalidCommand()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var command = new FakeLogicCommand();

            var handler = new DataHandler(session);
            Assert.That(() => handler.Execute(command), Throws.TypeOf<ArgumentException>());
        }

        [Test(Description = "Tests the Data Handler Storable")]
        public async Task DataHandlerTestStorable()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var command = new UserSave {Session = session, Model = UserData.GetFirst()};

            var handler = new DataHandler(session) {User = StandardUser};
            handler.User.Id.Should().Be(StandardUser.Id);
            await handler.Execute(command);
        }
    }
}