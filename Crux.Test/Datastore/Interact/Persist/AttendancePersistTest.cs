using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Interact.Index;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Interact;
using NUnit.Framework;
using Raven.Client.Documents;
using Crux.Data.Interact.Persist;

namespace Crux.Test.Datastore.Interact.Persist
{
    public class AttendancePersistTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new AttendanceIndex());

            using var session = store.OpenSession();
            session.Store(AttendanceData.GetFirst());
            session.Store(MeetingData.GetFirst());
            session.Store(UserData.GetFirst());
            session.SaveChanges();

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the AttendanceCheckIn data command")]
        public async Task AttendanceCheckInDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new AttendanceCheckin {Session = session, MeetingId = MeetingData.FirstId, AttendeeId = UserData.FirstId, CurrentUserId = UserData.FifthId};
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeTrue();
        }

        [Test(Description = "Tests the AttendanceCheckIn data command - missing")]
        public async Task AttendanceCheckInDataTestMissing()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new AttendanceCheckin { Session = session, MeetingId = "nonsense", AttendeeId = UserData.FirstId, CurrentUserId = UserData.FifthId };
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeFalse();
        }

        [Test(Description = "Tests the AttendanceNoShow data command")]
        public async Task AttendanceNoShowDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new AttendanceNoShow { Session = session, MeetingId = MeetingData.FirstId, AttendeeId = UserData.FirstId, CurrentUserId = UserData.FifthId };
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeTrue();
        }

        [Test(Description = "Tests the AttendanceNoShow data command - missing")]
        public async Task AttendanceNoShowDataTestMissing()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new AttendanceNoShow { Session = session, MeetingId = "nonsense", AttendeeId = UserData.FirstId, CurrentUserId = UserData.FifthId };
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeFalse();
        }

    }
}