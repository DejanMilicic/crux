using System.Collections.Generic;
using Crux.Data.Base.Results;

namespace Crux.Data.Interact.Result
{
    public class MsgMaster : ResultOwned
    {
        public string ReplyId { get; set; }
        public IEnumerable<string> Recipients { get; set; }
        public bool? IsPrivate { get; set; }
        public IEnumerable<string> Files { get; set; }
    }
}