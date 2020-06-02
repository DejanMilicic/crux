using System;
using System.Collections.Generic;
using Crux.Data.Base.Filters;

namespace Crux.Data.Interact.Filters
{
    public class MsgFilter : PagedFilter
    {
        public DateTime DateFrom { get; set; } = DateTime.MinValue;
        public DateTime DateTo { get; set; } = DateTime.MaxValue;
        public IList<string> RecipientKeys { get; set; } = new List<string>();
        public bool PrivateRestrict { get; set; } = false;
    }
}