using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Data.Core.Results;

namespace Crux.Data.Interact.Result
{
    public class StatsDisplay : ResultNamed
    {
        public IEnumerable<MeetingDisplay> Meetings { get; set; }
        public IEnumerable<MsgDisplay> Msgs { get; set; }
        public TenantDisplay Tenant { get; set; }
    }
}