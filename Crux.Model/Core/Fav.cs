using Crux.Model.Base;
using System.Collections.Generic;

namespace Crux.Model.Core
{
    public class Fav : EntityOwned
    {
        public string UserId { get; set; } = string.Empty;
        public string FilterKey { get; set; } = string.Empty;
        public IList<string> EntityIds { get; set; } = new List<string>();
    }
}