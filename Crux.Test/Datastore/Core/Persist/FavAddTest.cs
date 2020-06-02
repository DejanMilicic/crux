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
    public class FavAddTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new FavIndex());
            WaitForIndexing(store);
        }

        [Test(Description = "Tests the FavAdd New data command")]
        public async Task FavAddNewDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var persist = new FavAdd {Session = session, Key = "user", Value = UserData.FirstId, CurrentUser = StandardUser};
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeTrue();
            persist.Model.EntityIds.Count.Should().Be(1);
        }

        [Test(Description = "Tests the FavAdd Existing data command")]
        public async Task FavAddExistingDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            await session.StoreAsync(FavData.GetFirst());
            await session.SaveChangesAsync();

            WaitForIndexing(store);

            var persist = new FavAdd { Session = session, Key = "user", Value = UserData.SecondId, CurrentUser = StandardUser };
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeTrue();
            persist.Model.EntityIds.Count.Should().Be(2);
        }

        [Test(Description = "Tests the FavAdd Existing Fail data command")]
        public async Task FavAddExistingFailDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            await session.StoreAsync(FavData.GetFirst());
            await session.SaveChangesAsync();

            WaitForIndexing(store);

            var persist = new FavAdd { Session = session, Key = "user", Value = UserData.FirstId, CurrentUser = StandardUser };
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Success.Should().BeFalse();
            persist.Model.EntityIds.Count.Should().Be(1);
        }
    }
}