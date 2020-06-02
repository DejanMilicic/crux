using Crux.Data.Core.Results;
using Crux.Data.Interact.Result;
using System.Collections.Generic;

namespace Crux.Endpoint.ViewModel.Core
{
    public class StatsViewModel
    {
        public TenantDisplay Tenant { get; set; }
        public IEnumerable<DayViewModel<MeetingDisplay>> Meetings { get; set; }
        public IEnumerable<DayViewModel<MsgDisplay>> Messages { get; set; }
        public bool Success { get; set; } = false;
    }
}