using Crux.Model.Base;
using System.Collections.Generic;

namespace Crux.Model.Core
{
    public class Notes : EntityOwned
    {
        public string RefId { get; set; } = string.Empty;
        public IList<Note> History { get; set; } = new List<Note>();
    }
}