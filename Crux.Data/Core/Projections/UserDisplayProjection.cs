using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Core.Projections
{
    public static class UserDisplayProjection
    {
        public static IQueryable<UserDisplay> Transform(IQueryable<UserMaster> query)
        {
            return from master in query
                where master.IsActive.Value
                let config = RavenQuery.Load<UserConfig>(master.ConfigId)
                select new UserDisplay
                {
                    Id = master.Id,
                    Name = master.Name,
                    Email = master.Email,
                    TenantId = master.TenantId,
                    TenantName = master.TenantName,
                    AuthorId = master.AuthorId,
                    AuthorName = master.AuthorName,
                    RegionKey = master.RegionKey,
                    DateModified = master.DateModified,
                    DateCreated = master.DateCreated,
                    HasProfile = master.HasProfile,
                    ProfileId = master.ProfileId,
                    ProfileThumbUrl = master.ProfileThumbUrl,
                    ChatCounter = config.ChatCounter,
                    EmailNotify = config.EmailNotify,
                    PushNotify = config.PushNotify,
                    SmsNotify = config.SmsNotify,
                    CanAuth = master.CanAuth,
                    CanAdmin = master.CanAdmin,
                    CanSuperuser = master.CanSuperuser,
                    IsActive = master.IsActive,
                    HasPhone = master.HasPhone
                };
        }
    }
}