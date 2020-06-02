using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base;
using Crux.Model.Core;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Infrastructure
{
    public class BaseCommandTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            using var session = store.OpenSession();
            session.Store(TenantData.GetFirst());
            session.Store(UserData.GetFirst());
            session.SaveChanges();
        }

        [Test(Description = "Tests the Loader data command")]
        public async Task LoaderDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new Loader<Tenant> {Session = session, Id = TenantData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(TenantData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(TenantData.GetFirst()));
        }

        [Test(Description = "Tests the Loaders data command")]
        public async Task LoadersDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new Loaders<Tenant> {Session = session, Ids = new List<string> {TenantData.FirstId}};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.First().Id.Should().Be(TenantData.FirstId);
            Assert.That(loader.Result.First(), Is.DeepEqualTo(TenantData.GetFirst()));
        }

        [Test(Description = "Tests the Delete data command")]
        public async Task DeleteDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var delete = new Delete<User> {Session = session, Id = UserData.FirstId};
            await delete.Execute();

            delete.Result.Should().BeTrue();
        }

        [Test(Description = "Tests the Persist data command on Update")]
        public async Task PersistDataTestUpdate()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new Loader<Tenant> {Session = session, Id = TenantData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();

            var persist = new Persist<Tenant> {Session = session, Model = loader.Result};
            await persist.Execute();

            persist.Confirm.Success.Should().BeTrue();
        }

        [Test(Description = "Tests the Persist data command on Insert")]
        public async Task PersistDataTestInsert()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var model = TenantData.GetSecond();
            model.Id = string.Empty;

            var persist = new Persist<Tenant> {Session = session, Model = model};
            await persist.Execute();

            persist.Confirm.Success.Should().BeTrue();
        }

        [Test(Description = "Tests the Persist data command on Fail")]
        public async Task PersistDataTestFail()
        {
            var model = TenantData.GetSecond();
            model.Id = string.Empty;

            var persist = new Persist<Tenant> {Model = model};
            await persist.Execute();

            persist.Confirm.Success.Should().BeFalse();
        }
    }
}