using Crux.Data.Base.Results;
using Crux.Model.Base.Interface;
using System;
using System.Collections.Generic;

namespace Crux.Data.Interact.Result
{
    public class AttendanceDisplay : ResultProfile, IDated
    {
        public string UserId { get; set; } = string.Empty;
        public string MeetingId { get; set; } = string.Empty;
        public string MeetingName { get; set; } = string.Empty;
        public DateTime When { get; set; } = DateTime.UtcNow.AddDays(7);
        public bool IsConfirmed { get; set; } = false;
        public bool HasAttended { get; set; } = false;
        public IEnumerable<ResultProfile> Participants { get; set; } = new List<ResultProfile>();
        public bool CanAttend { get; set; } = false;
    }
}