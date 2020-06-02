using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Index;
using Crux.Data.Core.Loader;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Core.Loader
{
    public class TenantLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new TenantIndex());

            using (var session = store.OpenSession())
            {
                session.Store(TenantData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the TenantByEntryKey data command")]
        public async Task TenantByEntryKeyDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new TenantByEntryKey {Session = session, EntryKey = "first" };
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(TenantData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(TenantData.GetFirst()));
        }
    }
}