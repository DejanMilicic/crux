using Crux.Model.Core;
using Crux.Test.TestData.Core;
using NUnit.Framework;

namespace Crux.Test.Base
{
    [TestFixture]
    public class ControllerTest
    {
        protected User StandardUser { get; set; }
        protected User AdminUser { get; set; }
        protected User NonTenantUser { get; set; }
        protected User SuperUser { get; set; }

        [OneTimeSetUp]
        public void DefaultModel()
        {
            StandardUser = UserData.GetFirst();
            AdminUser = UserData.GetSecond();
            NonTenantUser = UserData.GetThird();
            SuperUser = UserData.GetFourth();
        }
    }
}