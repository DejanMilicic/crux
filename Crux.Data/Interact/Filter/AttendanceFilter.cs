using Crux.Data.Base.Filters;
using System;
using System.Collections.Generic;

namespace Crux.Data.Interact.Filters
{
    public class AttendanceFilter : PagedFilter
    {
        public DateTime DateFrom { get; set; } = DateTime.MinValue;
        public DateTime DateTo { get; set; } = DateTime.MaxValue;
        public IList<string> ParticipantKeys { get; set; } = new List<string>();
    }
}