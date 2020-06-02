using System.Threading.Tasks;
using FluentAssertions;
using Crux.Data.Base.Index;
using Crux.Data.Core.Index;
using Crux.Data.Core.Persist;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;
using Is = NUnit.DeepObjectCompare.Is;

namespace Crux.Test.Datastore.Core.Persist
{
    public class UserPersistTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new UserIndex());
            store.ExecuteIndex(new OwnedMasterIndex());

            using (var session = store.OpenSession())
            {
                session.Store(UserData.GetFirst());
                session.Store(UserConfigData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the UserSave data command")]
        public async Task UserSaveDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var model = UserData.GetSecond();

            var persist = new UserSave {Session = session, Model = model};
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Identity.Should().Be(model.Id);
            persist.Confirm.Success.Should().BeTrue();
            Assert.That(persist.Model, Is.DeepEqualTo(model));
        }

        [Test(Description = "Tests the UserSave data command - No Config")]
        public async Task UserSaveDataTestNoConfig()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();

            var model = UserData.GetSecond();
            model.ConfigId = string.Empty;

            var persist = new UserSave {Session = session, Model = model};
            await persist.Execute();

            persist.Confirm.Should().NotBeNull();
            persist.Confirm.Identity.Should().Be(UserData.SecondId);
            persist.Confirm.Success.Should().BeTrue();
            Assert.That(persist.Model, Is.DeepEqualTo(model));
        }
    }
}