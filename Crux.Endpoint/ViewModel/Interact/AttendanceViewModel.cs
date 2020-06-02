using System;
using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Interact
{
    public class AttendanceViewModel : OwnedViewModel
    {
        public string UserId { get; set; } = string.Empty;
        public string ProfileId { get; set; } = string.Empty;
        public string ProfileThumbUrl { get; set; } = string.Empty;
        public string MeetingId { get; set; } = string.Empty;
        public bool IsConfirmed { get; set; } = false;
        public bool IsCheckedIn { get; set; } = false;
        public string CheckedInUser { get; set; } = string.Empty;
        public DateTime CheckedInWhen { get; set; } = DateTime.UtcNow;
        public bool HasAttended { get; set; } = false;
        public DateTime AttendedWhen { get; set; } = DateTime.UtcNow;
        public bool IsNoShow { get; set; } = false;
        public string NoShowUser { get; set; } = string.Empty;
        public DateTime NoShowWhen { get; set; } = DateTime.UtcNow;
        public IEnumerable<ResultProfile> Participants { get; set; } = new List<ResultProfile>();
        public bool CanAttend { get; set; } = false;
    }
}