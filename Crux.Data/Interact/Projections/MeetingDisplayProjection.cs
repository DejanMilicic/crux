using System.Linq;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Interact.Projection
{
    public static class MeetingDisplayProjection
    {
        public static IQueryable<MeetingDisplay> Transform(IQueryable<MeetingMaster> query)
        {
            return from master in query
                where master.IsActive.Value
                let entity = RavenQuery.Load<Meeting>(master.Id)
                let attendances = RavenQuery.Load<Attendance>(entity.Attendances)
                select new MeetingDisplay
                {
                    Id = master.Id,
                    Name = master.Name,
                    TenantId = master.TenantId,
                    TenantName = entity.TenantName,
                    AuthorId = master.AuthorId,
                    AuthorName = master.AuthorName,
                    RegionKey = master.RegionKey,
                    DateModified = master.DateModified,
                    DateCreated = master.DateCreated,
                    IsActive = master.IsActive,
                    When = master.When,
                    IsComplete = master.IsComplete,
                    IsAttended = master.IsAttended,
                    Text = entity.Text,
                    IsPrivate = entity.IsPrivate,
                    ForceNotify = entity.ForceNotify,
                    NextId = entity.NextId,
                    PreviousId = entity.PreviousId,
                    IsRecur = master.IsRecur,
                    DaysWhen = master.DaysWhen,
                    NotesId = master.NotesId,
                    NoteCount = master.NoteCount,
                    Participants = attendances.Select((p, index) => new AttendanceDisplay()
                    {
                        Id = master.Attendances[index],
                        Name = p.Name,
                        TenantId = p.TenantId,
                        TenantName = p.TenantName,
                        IsActive = p.IsActive,
                        RegionKey = p.RegionKey,
                        DateCreated = p.DateCreated,
                        DateModified = p.DateModified,
                        UserId = p.UserId,
                        MeetingId = p.MeetingId,
                        IsConfirmed = p.IsConfirmed,
                        HasAttended = p.HasAttended,
                        ProfileThumbUrl = p.ProfileThumbUrl
                    })
                };
        }
    }
}