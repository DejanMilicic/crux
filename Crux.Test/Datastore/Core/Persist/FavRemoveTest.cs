using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Index;
using Crux.Data.Core.Persist;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;

namespace Crux.Test.Datastore.Core.Persist
{
    public class FavRemoveTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new FavIndex());

            using var session = store.OpenSession();
            session.Store(FavData.GetFirst());
            session.SaveChanges();

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the FavRemove Existing data command")]
        public async Task FavRemoveExistingDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new FavRemove {Session = session, Key = "user", Value = UserData.FirstId, CurrentUser = StandardUser};
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeTrue();
            persist.Model.EntityIds.Count.Should().Be(0);
        }

        [Test(Description = "Tests the FavRemove Fail data command")]
        public async Task FavRemoveFailDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new FavRemove { Session = session, Key = "user", Value = UserData.SecondId, CurrentUser = AdminUser };
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeFalse();
        }

    }
}