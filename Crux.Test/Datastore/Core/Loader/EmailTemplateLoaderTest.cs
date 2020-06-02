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
    public class NotifyTemplateLoaderTest : DataTest
    {
        protected override void SetupDatabase(IDocumentStore store)
        {
            store.ExecuteIndex(new NotifyTemplateIndex());

            using (var session = store.OpenSession())
            {
                session.Store(NotifyTemplateData.GetFirst());
                session.SaveChanges();
            }

            WaitForIndexing(store);
        }

        [Test(Description = "Tests the NotifyTemplateByName data command")]
        public async Task NotifyTemplateByNameDataTest()
        {
            using var store = GetDocumentStore();
            using var session = store.OpenAsyncSession();
            var loader = new NotifyTemplateByName {Session = session, Name = "welcomeuser"};
            await loader.Execute();

            loader.Result.Should().NotBeNull();
            loader.Result.Id.Should().Be(NotifyTemplateData.FirstId);
            Assert.That(loader.Result, Is.DeepEqualTo(NotifyTemplateData.GetFirst()));
        }
    }
}