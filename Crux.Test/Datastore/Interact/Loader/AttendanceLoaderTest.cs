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
    public class AttendanceLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new AttendanceIndex());
            store.ExecuteIndex(new MeetingIndex());
            store.ExecuteIndex(new UserIndex());

            using (var session = store.OpenSession())
            {
                session.Store(AttendanceData.GetFirst());
                session.Store(MeetingData.GetFirst());
                session.Store(UserData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the AttendanceById data command")]
        public async Task AttendanceByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new AttendanceById() {Session = session, Id = AttendanceData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(AttendanceData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(AttendanceData.GetFirst()));
        }
    }
}