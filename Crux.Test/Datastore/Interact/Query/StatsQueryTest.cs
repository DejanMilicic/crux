using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Core.Index;
using Crux.Data.Core.Query;
using Crux.Data.Interact.Index;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Interact;
using FluentAssertions;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Interact.Query
{
    public class StatsQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new MeetingIndex());
            store.ExecuteIndex(new MsgIndex());
            store.ExecuteIndex(new AttendanceIndex());
            store.ExecuteIndex(new TenantStatIndex());

            using (var session = store.OpenSession())
            {
                session.Store(MeetingData.GetFirst());
                session.Store(MsgData.GetFirst());
                session.Store(AttendanceData.GetFirst());
                session.Store(TenantData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the HomeComposite data command")]
        public async Task HomeCompositeDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new HomeComposite() { Session = session, CurrentUser = UserData.GetFirst() };
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Attendances.Count().Should().Be(0);
            query.Result.Msgs.Count().Should().Be(1);
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> { "something!" };
        }

        [Test(Description = "Tests the StatsComposite data command")]
        public async Task StatsCompositeDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var query = new StatsComposite() { Session = session, CurrentUser = UserData.GetFirst()};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Meetings.Count().Should().Be(0);
            query.Result.Msgs.Count().Should().Be(0);
            Assert.That(query.Result.Tenant, Is.DeepEqualTo(TenantData.GetFirstDisplay()));
            query.Result.Searchable.Should().BeNullOrEmpty();
            query.Result.Searchable = new List<string> {"something!"};
        }

    }
}