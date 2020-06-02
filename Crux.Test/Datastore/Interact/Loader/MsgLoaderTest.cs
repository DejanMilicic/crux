using System.Threading.Tasks;
using Crux.Data.Core.Index;
using FluentAssertions;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Loader;
using Crux.Test.Base;
using Crux.Test.TestData.Interact;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Interact.Loader
{
    public class MsgLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new MsgIndex());
            store.ExecuteIndex(new VisibleIndex());
            store.ExecuteIndex(new UserIndex());

            using (var session = store.OpenSession())
            {
                session.Store(MsgData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the MsgById data command")]
        public async Task MsgByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new MsgById() {Session = session, Id = MsgData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(MsgData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(MsgData.GetFirst()));
        }

        [Test(Description = "Tests the MsgById data command - Reply")]
        public async Task MsgByIdDataTestReply()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            await session.StoreAsync(MsgData.GetSecond());
            await session.SaveChangesAsync();

            WaitForIndexing(store);

            var loader = new MsgById() { Session = session, Id = MsgData.SecondId };
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(MsgData.SecondId);
            Assert.That(loader.Result, Is.DeepEqualTo(MsgData.GetSecond()));
        }

    }
}