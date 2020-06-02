using Crux.Data.Base.Results;
using System;
using System.Collections.Generic;

namespace Crux.Data.Interact.Result
{
    public class AttendanceMaster : ResultOwned
    {
        public string UserId { get; set; }
        public string MeetingId { get; set; }
        public string MeetingName { get; set; }
        public DateTime When { get; set; }
        public IList<string> Participants { get; set; } = new List<string>();
    }
}