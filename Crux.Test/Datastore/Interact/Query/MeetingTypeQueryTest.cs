using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Core.Index;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Query;
using Crux.Test.Base;
using Crux.Test.TestData.Interact;
using FluentAssertions;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Interact.Query
{
    public class MeetingTypeQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new MeetingTypeIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(MeetingTypeData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the MeetingTypeDisplayById data command")]
        public async Task MeetingTypeDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeDisplayById { Session = session, Id = MeetingTypeData.FirstId};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(MeetingTypeData.FirstId);
            Assert.That(query.Result, Is.DeepEqualTo(MeetingTypeData.GetFirstDisplay(false)));
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> {"something!"};
        }

        [Test(Description = "Tests the MeetingTypeDisplayByFilter data command - Tenant")]
        public async Task MeetingTypeDisplayByFilterDataTestTenant()
        {
            var filter = new MeetingTypeFilter { TenantRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MeetingTypeData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MeetingTypeDisplayByFilter data command - Recur")]
        public async Task MeetingTypeDisplayByFilterDataTestRecur()
        {
            var filter = new MeetingTypeFilter { RecurRestrict = true, Take = 10, Skip = 1};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);

            filter.Skip.Should().Be(1);
            filter.Start.Should().Be(10);
            query.Favourites.Should().Be(0);
        }

        [Test(Description = "Tests the MeetingTypeDisplayByFilter data command - Search")]
        public async Task MeetingTypeDisplayByFilterDataTestSearch()
        {
            var filter = new MeetingTypeFilter { Search = "test", Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MeetingTypeData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MeetingTypeDisplayByFilter data command - Fav")]
        public async Task MeetingTypeDisplayByFilterDataTestFav()
        {
            var filter = new MeetingTypeFilter { FavouriteRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the MeetingTypeRefByFilter data command - Search")]
        public async Task MeetingTypeRefByFilterDataTestSearch()
        {
            var filter = new MeetingTypeFilter { Search = "test", Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeRefByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            query.Result.First().Id.Should().Be(MeetingTypeData.FirstId);
        }

        [Test(Description = "Tests the MeetingTypeRefByFilter data command - Recur Restrict")]
        public async Task MeetingTypeRefByFilterDataTestRecur()
        {
            var filter = new MeetingTypeFilter { RecurRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingTypeRefByFilter { Session = session, Filter = filter, CurrentUser = SuperUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

    }
}