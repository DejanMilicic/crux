using System.Threading.Tasks;
using FluentAssertions;
using Crux.Endpoint.Api.External.Logic;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using NUnit.Framework;

namespace Crux.Test.Api.External.Logic
{
    [TestFixture]
    public class WriteTokenTest : ControllerTest
    {
        [Test(Description = "Tests the WriteToken Logic Command")]
        public async Task WriteTokenLogicSignup()
        {
            var token = new WriteToken {UserId = UserData.FirstId, JwtKey = "xxx123456xxx123456xxx"};
            await token.Execute();

            token.Result.Should().BeTrue();
            token.Verification.Should().NotBeNullOrEmpty();
        }
    }
}