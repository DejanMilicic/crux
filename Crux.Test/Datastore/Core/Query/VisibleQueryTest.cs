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
    public class VisibleQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new VisibleIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(VisibleData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the VisibleDisplayById data command")]
        public async Task VisibleDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayById {Session = session, Id = VisibleData.FirstId};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(VisibleData.FirstId);
            Assert.That(query.Result, Is.DeepEqualTo(VisibleData.GetFirstDisplay()));
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Tenant")]
        public async Task VisibleDisplayByFilterDataTestTenant()
        {
            var filter = new VisibleFilter {TenantRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(VisibleData.GetFirstDisplay()));
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Image")]
        public async Task VisibleDisplayByFilterDataTestImage()
        {
            var filter = new VisibleFilter {ImageRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(VisibleData.GetFirstDisplay()));
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Video")]
        public async Task VisibleDisplayByFilterDataTestVideo()
        {
            var filter = new VisibleFilter {VideoRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Document")]
        public async Task VisibleDisplayByFilterDataTestDocument()
        {
            var filter = new VisibleFilter {DocumentRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Search")]
        public async Task VisibleDisplayByFilterDataTestSearch()
        {
            var filter = new VisibleFilter {Search = "pupil", Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(VisibleData.GetFirstDisplay()));
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Fav")]
        public async Task VisibleDisplayByFilterDataTestFav()
        {
            var filter = new VisibleFilter {FavouriteRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the VisibleDisplayByFilter data command - Author")]
        public async Task VisibleDisplayByFilterDataTestAuthor()
        {
            var filter = new VisibleFilter {AuthorKeys = new List<string> {UserData.FirstId}, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new VisibleDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
        }
    }
}