using System;
using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Model.Base.Interface;

namespace Crux.Data.Interact.Result
{
    public class MsgDisplay : ResultOwned, IDated
    {
        public string AuthorProfileThumbUrl { get; set; } = string.Empty;
        public string ReplyId { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public bool? IsPrivate { get; set; } = false;
        public bool? ForceNotify { get; set; } = false;
        public IEnumerable<ResultProfile> Recipients { get; set; }
        public IEnumerable<ResultProfile> Files { get; set; }

        public DateTime When
        {
            get { return DateCreated.Value; }
        }
    }
}