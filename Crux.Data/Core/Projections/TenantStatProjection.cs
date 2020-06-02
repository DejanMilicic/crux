using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Core.Projections
{
    public static class TenantStatProjection
    {
        public static IQueryable<TenantDisplay> Transform(IQueryable<TenantStat> query)
        {
            return from result in query
                let tenant = RavenQuery.Load<Tenant>(result.Id)
                select new TenantDisplay
                {
                    Id = result.Id,
                    Name = tenant.Name,
                    DateModified = tenant.DateModified,
                    DateCreated = tenant.DateCreated,
                    HasProfile = tenant.HasProfile,
                    ProfileId = tenant.ProfileId,
                    ProfileThumbUrl = tenant.ProfileThumbUrl,
                    StorageLimit = tenant.StorageLimit,
                    UserLimit = tenant.UserLimit,
                    FileCount = result.FileCount,
                    FileSize = result.FileSize,
                    UserCount = result.UserCount,
                    IsActive = tenant.IsActive
                };
        }
    }
}