using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Core.Index;
using Crux.Data.Core.Loader;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;

namespace Crux.Test.Datastore.Core.Loader
{
    public class UserLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new UserIndex());

            using (var session = store.OpenSession())
            {
                session.Store(UserData.GetFirst());
                session.Store(UserConfigData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the UserById data command")]
        public async Task UserByIdDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var loader = new UserById {Session = session, Id = UserData.FirstId};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(UserData.FirstId);
        }

        [Test(Description = "Tests the UserByEmail data command")]
        public async Task UserByEmailDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var loader = new UserByEmail {Session = session, Email = UserData.GetFirst().Email};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(UserData.FirstId);
        }
    }
}