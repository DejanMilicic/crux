using Crux.Model.Base;
using Crux.Model.Core.Interface;
using System;
using System.Collections.Generic;

namespace Crux.Model.Interact
{
    public class Meeting : EntityOwned, INotable, INotifyable
    {
        public string PreviousId { get; set; } = string.Empty;
        public string NextId { get; set; } = string.Empty;
        public string MeetingTypeId { get; set; } = string.Empty;
        public DateTime When { get; set; } = DateTime.UtcNow.AddDays(7);
        public string Text { get; set; } = string.Empty;
        public bool IsAttended { get; set; } = false;
        public bool IsComplete { get; set; } = false;
        public bool IsPrivate { get; set; } = false;
        public bool ForceNotify { get; set; } = false;
        public IList<string> Participants { get; set; } = new List<string>();
        public IList<string> Attendances { get; set; } = new List<string>();
        public string NotesId { get; set; } = string.Empty;
    }
}