using Crux.Model.Base;
using Crux.Model.Core.Interface;
using System.Collections.Generic;

namespace Crux.Model.Interact
{
    public class Msg : EntityOwned, INotifyable
    {
        public string ReplyId { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public bool IsPrivate { get; set; } = false;
        public bool ForceNotify { get; set; } = false;
        public IList<string> Recipients { get; set; } = new List<string>();
        public IList<string> Files { get; set; } = new List<string>();
    }
}