using System.Collections.Generic;
using System.Linq;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Interact.Index
{
    public class AttendanceIndex : AbstractIndexCreationTask<Attendance, AttendanceMaster>
    {
        public AttendanceIndex()
        {
            Map = attendances => from attendance in attendances
                where attendance.IsActive
                let meeting = LoadDocument<Meeting>(attendance.MeetingId)
                select new
                {
                    attendance.Id,
                    attendance.Name,
                    attendance.TenantId,
                    attendance.AuthorId,
                    attendance.RegionKey,
                    attendance.IsActive,
                    attendance.DateCreated,
                    attendance.DateModified,
                    attendance.MeetingId,
                    attendance.UserId,
                    meeting.When,
                    meeting.Participants,
                    MeetingName = meeting.Name,
                    Searchable = new List<string>
                    {
                        attendance.Name, attendance.TenantName, attendance.AuthorName, meeting.Name,
                        attendance.AttendedWhen.ToLongDateString()
                    }
                };

            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            StoreAllFields(FieldStorage.Yes);
            Priority = IndexPriority.Normal;
        }
    }
}