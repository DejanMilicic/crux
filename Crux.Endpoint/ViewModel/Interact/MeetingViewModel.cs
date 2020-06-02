using System;
using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Interact
{
    public class MeetingViewModel : OwnedViewModel
    {
        public string PreviousId { get; set; } = string.Empty;
        public string MeetingTypeId { get; set; } = string.Empty;
        public string Text { get; set; }
        public DateTime When { get; set; }
        public string AuthorId { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public bool IsAttended { get; set; } = false;
        public bool IsComplete { get; set; } = false;
        public bool IsPrivate { get; set; } = false;
        public bool ForceNotify { get; set; } = false;
        public IEnumerable<ResultProfile> Attendees { get; set; } = new List<ResultProfile>();
    }
}