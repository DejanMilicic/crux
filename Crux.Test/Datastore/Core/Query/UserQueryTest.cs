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
    public class UserQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new UserIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(UserData.GetFirst());
                session.Store(UserConfigData.GetFirst());
                session.Store(FavData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the UserDisplayById data command")]
        public async Task UserDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserDisplayById {Session = session, Id = UserData.FirstId};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(UserData.FirstId);
            Assert.That(query.Result, Is.DeepEqualTo(UserData.GetFirstDisplay(true)));
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> {"something!"};
        }

        [Test(Description = "Tests the UserDisplayByFilter data command - Tenant")]
        public async Task UserDisplayByFilterDataTestTenant()
        {
            var filter = new UserFilter {TenantRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(UserData.GetFirstDisplay(true)));
        }

        [Test(Description = "Tests the UserDisplayByFilter data command - Auth")]
        public async Task UserDisplayByFilterDataTestAuth()
        {
            var filter = new UserFilter {AuthRestrict = true, Take = 10, Skip = 1};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);

            filter.Skip.Should().Be(1);
            filter.Start.Should().Be(10);
            query.Favourites.Should().Be(0);
        }

        [Test(Description = "Tests the UserDisplayByFilter data command - Search")]
        public async Task UserDisplayByFilterDataTestSearch()
        {
            var filter = new UserFilter {Search = "test", Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(UserData.GetFirstDisplay(true)));
        }

        [Test(Description = "Tests the UserDisplayByFilter data command - Fav")]
        public async Task UserDisplayByFilterDataTestFav()
        {
            var filter = new UserFilter {FavouriteRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserDisplayByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(UserData.GetFirstDisplay(true)));
        }

        [Test(Description = "Tests the UserRefByFilter data command - Search")]
        public async Task UserRefByFilterDataTestSearch()
        {
            var filter = new UserFilter {Search = "test", Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserRefByFilter {Session = session, Filter = filter, CurrentUser = StandardUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            query.Result.First().Id.Should().Be(UserData.FirstId);
        }

        [Test(Description = "Tests the UserRefByFilter data command - Auth Restrict")]
        public async Task UserRefByFilterDataTestAuth()
        {
            var filter = new UserFilter {AuthRestrict = true, Take = 10};

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new UserRefByFilter {Session = session, Filter = filter, CurrentUser = SuperUser};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }
    }
}