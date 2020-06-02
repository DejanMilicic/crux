using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Data.Core.Results;
using Crux.Data.Interact.Result;
using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Interact
{
    public class MsgViewModel : OwnedViewModel
    {
        public string ReplyId { get; set; } = string.Empty;
        public string Text { get; set; }
        public bool IsPrivate { get; set; }
        public bool ForceNotify { get; set; }
        public IEnumerable<ResultProfile> Recipients { get; set; }
        public IEnumerable<VisibleDisplay> Files { get; set; }
        public bool HasReply { get; set; }
        public MsgDisplay Reply { get; set; }
    }
}