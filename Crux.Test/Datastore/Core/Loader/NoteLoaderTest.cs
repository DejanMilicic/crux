using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Index;
using Crux.Data.Core.Loader;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Core.Loader
{
    public class NoteLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new NoteIndex());
            store.ExecuteIndex(new NotableIndex());

            using (var session = store.OpenSession())
            {
                session.Store(NoteData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the NoteByRefId data command")]
        public async Task NoteByRefIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new NotesByRefId {Session = session, Id = UserData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(NoteData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(NoteData.GetFirst()));
        }
    }
}