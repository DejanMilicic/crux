using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Endpoint.Api.Base;
using Crux.Model.Core;
using Crux.Model.Interact;
using Raven.Client.Documents.Linq;

namespace Crux.Endpoint.Api.Interact.Logic
{
    public class AttendCheck : LogicCommand
    {
        public User CurrentUser { get; set; }
        public Meeting Meeting { get; set; }
        public IEnumerable<Attendance> ResultAttendance { get; set; }
        public bool Result { get; set; }

        public override async Task Execute()
        {
            if (string.IsNullOrEmpty(Meeting.Id))
            {
                var persist = new Persist<Meeting>() {Model = Meeting};
                await DataHandler.Execute(persist);
                Meeting = persist.Model;
            }

            var loaderAttend = new Loaders<Attendance>() {Ids = Meeting.Attendances};
            await DataHandler.Execute(loaderAttend);

            var loaderParticipate = new Loaders<User>() {Ids = Meeting.Participants};
            await DataHandler.Execute(loaderParticipate);

            var attendances = loaderAttend.Result.ToList();
            var participants = loaderParticipate.Result.ToList();

            foreach (var participant in participants)
            {
                if (!CheckAttendance(participant, attendances))
                {
                    var attendance = new Attendance()
                    {
                        MeetingId = Meeting.Id,
                        Name = participant.Name,
                        IsConfirmed = false,
                        UserId = participant.Id,
                        HasProfile = participant.HasProfile,
                        ProfileId = participant.ProfileId,
                        ProfileThumbUrl = participant.ProfileThumbUrl,
                        HasAttended = false,
                        AuthorId = CurrentUser.Id,
                        AuthorName = CurrentUser.Name,
                        TenantId = CurrentUser.TenantId,
                        TenantName = CurrentUser.TenantName,
                        RegionKey = CurrentUser.RegionKey
                    };

                    var persist = new Persist<Attendance>() {Model = attendance};
                    await DataHandler.Execute(persist);

                    if (persist.Confirm.Success)
                    {
                        attendances.Add(persist.Model);
                    }
                }
            }

            var removal = new List<string>();

            foreach (var attendance in attendances)
            {
                if (!CheckParticipant(attendance, participants))
                {
                    removal.Add(attendance.Id);
                    var delete = new Delete<Attendance>() {Id = attendance.Id};
                    await DataHandler.Execute(delete);
                }
            }

            attendances.RemoveAll(a => a.Id.In(removal));

            Meeting.Participants = participants.Select(p => p.Id).ToList();
            Meeting.Attendances = attendances.Select(p => p.Id).ToList();

            Result = true;
        }

        private bool CheckAttendance(User participant, IEnumerable<Attendance> attendances)
        {
            foreach (var attendance in attendances)
            {
                if (attendance.UserId == participant.Id)
                {
                    return true;
                }
            }

            return false;
        }

        private bool CheckParticipant(Attendance attendee, IEnumerable<User> participants)
        {
            foreach (var participant in participants)
            {
                if (attendee.UserId == participant.Id)
                {
                    return true;
                }
            }

            return false;
        }
    }
}