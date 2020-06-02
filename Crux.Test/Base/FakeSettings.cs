using Crux.Model.Utility;
using Microsoft.Extensions.Options;

namespace Crux.Test.Base
{
    public class FakeSettings : IOptions<Keys>
    {
        public Keys Value { get; set; } = new Keys();
    }
}