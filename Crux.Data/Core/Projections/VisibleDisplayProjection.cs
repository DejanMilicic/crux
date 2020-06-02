using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Base;

namespace Crux.Data.Core.Projections
{
    public static class VisibleDisplayProjection
    {
        public static IQueryable<VisibleDisplay> Transform(IQueryable<VisibleFile> query)
        {
            return from entity in query
                where entity.IsActive
                select new VisibleDisplay
                {
                    Id = entity.Id,
                    Name = entity.Name,
                    TenantId = entity.TenantId,
                    TenantName = entity.TenantName,
                    RegionKey = entity.RegionKey,
                    DateModified = entity.DateModified,
                    DateCreated = entity.DateCreated,
                    Width = entity.Width,
                    Height = entity.Height,
                    Length = entity.Length,
                    FullUrl = entity.FullUrl,
                    ThumbUrl = entity.ThumbUrl,
                    ContentType = entity.ContentType,
                    IsImage = entity.IsImage,
                    IsVideo = entity.IsVideo,
                    IsDocument = entity.IsDocument,
                    AuthorId = entity.AuthorId,
                    AuthorName = entity.AuthorName,
                    IsActive = entity.IsActive
                };
        }
    }
}