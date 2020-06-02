using System.Linq;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Result;
using Crux.Model.Core;
using Crux.Model.Interact;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Interact.Projection
{
    public static class AttendanceDisplayProjection
    {
        public static IQueryable<AttendanceDisplay> Transform(IQueryable<AttendanceMaster> query)
        {
            return from master in query
                where master.IsActive.Value
                let entity = RavenQuery.Load<Attendance>(master.Id)
                let participants = RavenQuery.Load<User>(master.Participants.Where(p => p != master.UserId))
                select new AttendanceDisplay
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
                    UserId = master.UserId,
                    When = master.When,
                    MeetingId = master.MeetingId,
                    MeetingName = master.MeetingName,
                    ProfileThumbUrl = entity.ProfileThumbUrl,
                    IsConfirmed = entity.IsConfirmed,
                    HasAttended = entity.HasAttended,
                    Participants = participants.Select((p, index) => new ResultProfile()
                    {
                        Id = master.Participants[index],
                        Name = p.Name,
                        TenantId = p.TenantId,
                        TenantName = p.TenantName,
                        IsActive = p.IsActive,
                        RegionKey = p.RegionKey,
                        DateCreated = p.DateCreated,
                        DateModified = p.DateModified,
                        ProfileThumbUrl = p.ProfileThumbUrl
                    })
                };
        }
    }
}