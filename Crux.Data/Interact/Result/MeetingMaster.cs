using Crux.Data.Base.Results;
using System;
using System.Collections.Generic;

namespace Crux.Data.Interact.Result
{
    public class MeetingMaster : ResultOwned
    {
        public DateTime When { get; set; }
        public string MeetingTypeId { get; set; }
        public bool? IsRecur { get; set; } = false;
        public int? DaysWhen { get; set; } = 7;
        public bool? IsComplete { get; set; }
        public bool? IsAttended { get; set; }
        public string NotesId { get; set; }
        public int? NoteCount { get; set; } = 0;
        public IEnumerable<string> Participants { get; set; } = new List<string>();
        public IList<string> Attendances { get; set; } = new List<string>();
    }
}