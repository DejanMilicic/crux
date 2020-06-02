using Crux.Model.Core;
using Crux.Test.TestData.Core;
using NUnit.Framework;
using Raven.Client.Documents;
using Raven.TestDriver;

namespace Crux.Test.Base
{
    [TestFixture]
    public abstract class DataTest : RavenTestDriver
    {
        protected User StandardUser { get; set; }
        protected User AdminUser { get; set; }
        protected User NonTenantUser { get; set; }
        protected User SuperUser { get; set; }

        protected override void PreInitialize(IDocumentStore store)
        {
            store.Conventions.IdentityPartsSeparator = "-";

            StandardUser = UserData.GetFirst();
            AdminUser = UserData.GetSecond();
            NonTenantUser = UserData.GetThird();
            SuperUser = UserData.GetFourth();
        }

        protected abstract override void SetupDatabase(IDocumentStore store);
    }
}