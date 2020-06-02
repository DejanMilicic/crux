using System.Threading.Tasks;
using Crux.Data.Core.Index;
using FluentAssertions;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Loader;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Interact;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Interact.Loader
{
    public class MeetingLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new MeetingIndex());
            store.ExecuteIndex(new UserIndex());
            store.ExecuteIndex(new AttendanceIndex());

            using (var session = store.OpenSession())
            {
                session.Store(MeetingData.GetFirst());
                session.Store(AttendanceData.GetFirst());
                session.Store(AttendanceData.GetSecond());
                session.Store(UserData.GetFirst());
                session.Store(UserData.GetSecond());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the MeetingById data command")]
        public async Task MeetingByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new MeetingById() {Session = session, Id = MeetingData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(MeetingData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(MeetingData.GetFirst()));
        }
    }
}