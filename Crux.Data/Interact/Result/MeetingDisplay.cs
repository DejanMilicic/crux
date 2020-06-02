using System;
using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Model.Base.Interface;

namespace Crux.Data.Interact.Result
{
    public class MeetingDisplay : ResultOwned, IDated
    {
        public string PreviousId { get; set; } = string.Empty;
        public string NextId { get; set; } = string.Empty;
        public DateTime When { get; set; } = DateTime.UtcNow.AddDays(7);
        public string Text { get; set; } = string.Empty;
        public bool? IsComplete { get; set; } = false;
        public bool? IsAttended { get; set; } = false;
        public bool? IsPrivate { get; set; } = false;
        public bool? IsRecur { get; set; } = false;
        public int? DaysWhen { get; set; } = 7;
        public string NotesId { get; set; } = string.Empty;
        public int? NoteCount { get; set; } = 0;
        public bool? ForceNotify { get; set; } = false;
        public IEnumerable<AttendanceDisplay> Participants { get; set; } = new List<AttendanceDisplay>();
    }
}