using System;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Index;
using Crux.Model.Core.Confirm;
using Crux.Model.Interact;
using Raven.Client.Documents;

namespace Crux.Data.Interact.Persist
{
    public class AttendanceNoShow : Persist<Attendance>
    {
        public string MeetingId { get; set; } = string.Empty;
        public string AttendeeId { get; set; } = string.Empty;
        public string CurrentUserId { get; set; } = string.Empty;
        public bool Result { get; set; } = false;

        public override async Task Execute()
        {
            Model = await Session.Query<Attendance, AttendanceIndex>()
                .FirstOrDefaultAsync(a => a.MeetingId == MeetingId && a.UserId == AttendeeId);

            if (Model != null)
            {
                Model.IsNoShow = true;
                Model.NoShowUser = CurrentUserId;
                Model.NoShowWhen = DateTime.UtcNow;
                Model.HasAttended = false;
                Model.IsCheckedIn = false;
                Model.IsConfirmed = false;

                await base.Execute();
                Result = true;
            }
            else
            {
                Confirm = ModelConfirm<Attendance>.CreateFailure(
                    "Failed to find Attendance " + MeetingId + "---" + AttendeeId);
            }
        }
    }
}