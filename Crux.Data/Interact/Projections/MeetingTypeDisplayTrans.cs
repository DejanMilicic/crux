using System.Linq;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;

namespace Crux.Data.Interact.Projection
{
    public static class MeetingTypeDisplayTrans
    {
        public static IQueryable<MeetingTypeDisplay> Transform(IQueryable<MeetingType> query)
        {
            return from entity in query
                where entity.IsActive
                select new MeetingTypeDisplay
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    TenantId = entity.TenantId,
                    TenantName = entity.TenantName,
                    AuthorId = entity.AuthorId,
                    AuthorName = entity.AuthorName,
                    RegionKey = entity.RegionKey,
                    DateModified = entity.DateModified,
                    DateCreated = entity.DateCreated,
                    IsActive = entity.IsActive,
                    Prename = entity.Prename,
                    Pretext = entity.Pretext,
                    DaysWhen = entity.DaysWhen,
                    IsRecur = entity.IsRecur
                };
        }
    }
}