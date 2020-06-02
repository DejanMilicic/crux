using System;
using System.Threading.Tasks;
using Crux.Endpoint.Infrastructure;
using Crux.Model.Utility;
using Crux.Test.Base;
using Moq;
using NUnit.Framework;

namespace Crux.Test.Infrastructure
{
    public class StoreTest
    {
        [Test(Description = "Initialises the Datastore")]
        public async Task DatastoreInit()
        {
            var provider = new Mock<IServiceProvider>();

            provider.Setup(p => p.GetService(It.IsAny<Type>())).Returns(new FakeSettings()
                {Value = new Keys() {RavenDatabase = "Crux", RavenUrls = new string[1] {"http://localhost:8080"}}});
            var store = StoreInjecton.CreateStore(provider.Object);
            await Task.CompletedTask;
        }
    }
}