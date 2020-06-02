using System.Linq;
using Crux.Data.Base.Results;
using Crux.Model.Base.Interface;

namespace Crux.Data.Base.Projections
{
    public static class ResultProfileProjection
    {
        public static IQueryable<ResultProfile> Transform(IQueryable<IEntityProfile> query)
        {
            return from entity in query
                select new ResultProfile
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    TenantId = entity.TenantId,
                    TenantName = entity.TenantName,
                    IsActive = entity.IsActive,
                    RegionKey = entity.RegionKey,
                    DateCreated = entity.DateCreated,
                    DateModified = entity.DateModified,
                    ProfileThumbUrl = entity.ProfileThumbUrl
                };
        }
    }
}