using Crux.Model.Base;
using System;

namespace Crux.Model.Interact
{
    public class Attendance : EntityProfile
    {
        public string UserId { get; set; } = string.Empty;
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
    }
}