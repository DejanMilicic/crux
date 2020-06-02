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

namespace Crux.Test.Datastore.Interact.Query
{
    public class AttendanceQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new AttendanceIndex());
            store.ExecuteIndex(new FavFanIndex());

            using (var session = store.OpenSession())
            {
                session.Store(AttendanceData.GetFirst());
                session.Store(AttendanceData.GetSecond());
                session.Store(MeetingData.GetFirst());
                session.Store(UserData.GetFirst());
                session.Store(UserData.GetSecond());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the AttendanceDisplayById data command")]
        public async Task AttendanceDisplayByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayById { Session = session, Id = AttendanceData.FirstId };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(AttendanceData.FirstId);
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> { "something!" };
        }

        [Test(Description = "Tests the AttendanceDisplayByFilter data command - Tenant")]
        public async Task AttendanceDisplayByFilterDataTestTenant()
        {
            var filter = new AttendanceFilter { TenantRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(2);
        }

        [Test(Description = "Tests the AttendanceDisplayByFilter data command - Date")]
        public async Task AttendanceDisplayByFilterDataTestDate()
        {
            var filter = new AttendanceFilter { DateFrom = DateTime.UtcNow.AddDays(-1), DateTo = DateTime.UtcNow.AddDays(1), Take = 10, Skip = 1 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);

            filter.Skip.Should().Be(1);
            filter.Start.Should().Be(10);
            query.Favourites.Should().Be(0);
        }

        [Test(Description = "Tests the AttendanceDisplayByFilter data command - Search")]
        public async Task AttendanceDisplayByFilterDataTestSearch()
        {
            var filter = new AttendanceFilter { Search = "test", Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(2);
        }

        [Test(Description = "Tests the AttendanceDisplayByFilter data command - Fav")]
        public async Task AttendanceDisplayByFilterDataTestFav()
        {
            var filter = new AttendanceFilter { FavouriteRestrict = true, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(0);
        }

        [Test(Description = "Tests the AttendanceDisplayByFilter data command - Author")]
        public async Task AttendanceDisplayByFilterDataTestAuthor()
        {
            var filter = new AttendanceFilter { AuthorKeys = new List<string>() { UserData.FirstId }, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
        }

        [Test(Description = "Tests the AttendanceDisplayByFilter data command - Participants")]
        public async Task AttendanceDisplayByFilterDataTestParticipant()
        {
            var filter = new AttendanceFilter { ParticipantKeys = new List<string>() { UserData.FirstId }, Take = 10 };

            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new AttendanceDisplayByFilter { Session = session, Filter = filter, CurrentUser = StandardUser };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Count().Should().Be(1);
        }

    }
}