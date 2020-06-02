using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Core.Index;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Query;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Interact;
using FluentAssertions;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Interact.Query
{
    public class MsgQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new MsgIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(MsgData.GetFirst());
                session.Store(UserData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the MsgDisplayById data command")]
        public async Task MsgDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayById { Session = session, Id = MsgData.FirstId };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(MsgData.FirstId);
            Assert.That(query.Result, Is.DeepEqualTo(MsgData.GetFirstDisplay(false)));
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> { "something!" };
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Tenant")]
        public async Task MsgDisplayByFilterDataTestTenant()
        {
            var filter = new MsgFilter { TenantRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MsgData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Date")]
        public async Task MsgDisplayByFilterDataTestDate()
        {
            var filter = new MsgFilter { DateFrom = DateTime.UtcNow.AddDays(-1), DateTo = DateTime.UtcNow.AddDays(1), Take = 10, Skip = 1 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);

            filter.Skip.Should().Be(1);
            filter.Start.Should().Be(10);
            query.Favourites.Should().Be(0);
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Search")]
        public async Task MsgDisplayByFilterDataTestSearch()
        {
            var filter = new MsgFilter { Search = "test", Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MsgData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Fav")]
        public async Task MsgDisplayByFilterDataTestFav()
        {
            var filter = new MsgFilter { FavouriteRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Author")]
        public async Task MsgDisplayByFilterDataTestAuthor()
        {
            var filter = new MsgFilter { AuthorKeys = new List<string>() { UserData.FirstId }, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MsgData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Recipient")]
        public async Task MsgDisplayByFilterDataTestRecipient()
        {
            var filter = new MsgFilter { RecipientKeys = new List<string>() { UserData.FirstId }, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MsgData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MsgDisplayByFilter data command - Private")]
        public async Task MsgDisplayByFilterDataTestPrivate()
        {
            var filter = new MsgFilter { PrivateRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MsgDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

    }
}