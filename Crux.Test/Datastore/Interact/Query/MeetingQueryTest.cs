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
    public class MeetingQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new MeetingIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(MeetingData.GetFirst());
                session.Store(MeetingTypeData.GetFirst());
                session.Store(MeetingTypeData.GetSecond());
                session.Store(UserData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the MeetingDisplayById data command")]
        public async Task MeetingDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayById { Session = session, Id = MeetingData.FirstId };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(MeetingData.FirstId);
            Assert.That(query.Result, Is.DeepEqualTo(MeetingData.GetFirstDisplay(false)));
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> { "something!" };
        }

        [Test(Description = "Tests the MeetingDisplayByFilter data command - Tenant")]
        public async Task MeetingDisplayByFilterDataTestTenant()
        {
            var filter = new MeetingFilter { TenantRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MeetingData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MeetingDisplayByFilter data command - Date")]
        public async Task MeetingDisplayByFilterDataTestDate()
        {
            var filter = new MeetingFilter { DateFrom = DateTime.UtcNow.AddDays(-1), DateTo = DateTime.UtcNow.AddDays(1), Take = 10, Skip = 1 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);

            filter.Skip.Should().Be(1);
            filter.Start.Should().Be(10);
            query.Favourites.Should().Be(0);
        }

        [Test(Description = "Tests the MeetingDisplayByFilter data command - Search")]
        public async Task MeetingDisplayByFilterDataTestSearch()
        {
            var filter = new MeetingFilter { Search = "test", Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MeetingData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MeetingDisplayByFilter data command - Fav")]
        public async Task MeetingDisplayByFilterDataTestFav()
        {
            var filter = new MeetingFilter { FavouriteRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the MeetingDisplayByFilter data command - Author")]
        public async Task MeetingDisplayByFilterDataTestAuthor()
        {
            var filter = new MeetingFilter { AuthorKeys = new List<string>() { UserData.FirstId }, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MeetingData.GetFirstDisplay(false)));
        }

        [Test(Description = "Tests the MeetingDisplayByFilter data command - Recipient")]
        public async Task MeetingDisplayByFilterDataTestRecipient()
        {
            var filter = new MeetingFilter { ParticipantKeys = new List<string>() { UserData.FirstId }, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new MeetingDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
            Assert.That(query.Result.First(), Is.DeepEqualTo(MeetingData.GetFirstDisplay(false)));
        }
    }
}