using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base.Index;
using Crux.Data.Core.Index;
using Crux.Data.Core.Persist;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Core.Persist
{
    public class AttendancePersistTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new TenantIndex());
            store.ExecuteIndex(new OwnedMasterIndex());

            using var session = store.OpenSession();
            session.Store(TenantData.GetFirst());
            session.SaveChanges();

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the TenantSave data command")]
        public async Task TenantSaveDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var model = TenantData.GetSecond();

            var persist = new TenantSave {Session = session, Model = model};
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Identity.Should().Be(model.Id);
            persist.Confirm.Success.Should().BeTrue();
            Assert.That(persist.Model, Is.DeepEqualTo(model));
        }

        [Test(Description = "Tests the TenantDelete data command")]
        public async Task TenantDeleteDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new TenantDelete {Session = session, Id = TenantData.FirstId};
            await persist.Execute();

            persist.Should().NotBeNull();
            persist.Result.Should().Be(true);
        }
    }
}