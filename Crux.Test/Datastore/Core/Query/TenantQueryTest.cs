using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Index;
using Crux.Data.Core.Query;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using FluentAssertions;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Core.Query
{
    public class TenantQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new TenantStatIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(TenantData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the TenantDisplayById data command")]
        public async Task TenantDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new TenantDisplayById {Session = session, Id = TenantData.FirstId};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(TenantData.FirstId);
            query.Result.Searchable.Should().BeEmpty();
            Assert.That(query.Result, Is.DeepEqualTo(TenantData.GetFirstDisplay()));
        }

        [Test(Description = "Tests the TenantDisplayByFilter data command - Search")]
        public async Task TenantDisplayByFilterDataTestSearch()
        {
            var filter = new TenantFilter {Search = "Org", Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new TenantDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(TenantData.GetFirstDisplay()));
        }

        [Test(Description = "Tests the TenantDisplayByFilter data command - Author")]
        public async Task TenantDisplayByFilterDataTestAuthor()
        {
            var filter = new TenantFilter {AuthorKeys = new List<string>() {UserData.FourthId}, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new TenantDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(TenantData.GetFirstDisplay()));
        }
    }
}