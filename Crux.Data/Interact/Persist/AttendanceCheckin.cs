using System;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Index;
using Crux.Model.Core.Confirm;
using Crux.Model.Interact;
using Raven.Client.Documents;

namespace Crux.Data.Interact.Persist
{
    public class AttendanceCheckin : Persist<Attendance>
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
                if (!Model.IsNoShow && Model.NoShowUser != CurrentUserId)
                {
                    if (!Model.HasAttended && Model.UserId == CurrentUserId)
                    {
                        Model.HasAttended = true;
                        Model.AttendedWhen = DateTime.UtcNow;
                        Model.IsNoShow = false;

                        if (Model.IsCheckedIn)
                        {
                            Model.IsConfirmed = true;
                        }

                        Result = true;
                    }
                    else if (!Model.IsCheckedIn && Model.UserId != CurrentUserId)
                    {
                        Model.IsCheckedIn = true;
                        Model.CheckedInUser = CurrentUserId;
                        Model.CheckedInWhen = DateTime.UtcNow;
                        Model.IsNoShow = false;

                        if (Model.HasAttended)
                        {
                            Model.IsConfirmed = true;
                        }

                        Result = true;
                    }

                    if (Result)
                    {
                        await base.Execute();
                    }
                }
            }
            else
            {
                Confirm = ModelConfirm<Attendance>.CreateFailure(
                    "Failed to find Attendance " + MeetingId + "---" + AttendeeId);
            }
        }
    }
}