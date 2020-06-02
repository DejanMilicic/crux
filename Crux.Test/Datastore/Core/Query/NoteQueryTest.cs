using System.Threading.Tasks;
using Crux.Data.Core.Index;
using Crux.Data.Core.Loader;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using FluentAssertions;
using NUnit.Framework;
using Raven.Client.Documents;

namespace Crux.Test.Datastore.Core.Query
{
    public class NoteQueryTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new NoteIndex());
            store.ExecuteIndex(new NotableIndex());

            using (var session = store.OpenSession())
            {
                session.Store(UserData.GetFirst());
                session.Store(NoteData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the NotableMasterById data command")]
        public async Task NotableMasterByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var query = new NotesByRefId {Session = session, Id = UserData.FirstId};
            await query.Execute();

            query.Result.Should().NotBeNull();
            query.Result.Id.Should().Be(NoteData.FirstId);
        }
    }
}