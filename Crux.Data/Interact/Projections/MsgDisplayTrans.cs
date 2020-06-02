using System.Linq;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Result;
using Crux.Model.Base;
using Crux.Model.Core;
using Crux.Model.Interact;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Interact.Projection
{
    public static class MsgDisplayTrans
    {
        public static IQueryable<MsgDisplay> Transform(IQueryable<MsgMaster> query)
        {
            return from master in query
                where master.IsActive.Value
                let entity = RavenQuery.Load<Msg>(master.Id)
                let author = RavenQuery.Load<User>(master.AuthorId)
                let recipients = RavenQuery.Load<User>(master.Recipients)
                let files = RavenQuery.Load<VisibleFile>(master.Files)
                select new MsgDisplay
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
                    Text = entity.Text,
                    IsPrivate = entity.IsPrivate,
                    ForceNotify = entity.ForceNotify,
                    AuthorProfileThumbUrl = author.ProfileThumbUrl,
                    Recipients = recipients.Select((r, index) => new ResultProfile()
                    {
                        Id = master.Recipients.ElementAt(index),
                        Name = r.Name,
                        TenantId = r.TenantId,
                        TenantName = r.TenantName,
                        AuthorId = r.AuthorId,
                        AuthorName = r.AuthorName,
                        IsActive = r.IsActive,
                        RegionKey = r.RegionKey,
                        DateCreated = r.DateCreated,
                        DateModified = r.DateModified,
                        ProfileThumbUrl = r.ProfileThumbUrl
                    }),
                    Files = files.Select((f, index) => new ResultProfile()
                    {
                        Id = master.Files.ElementAt(index),
                        Name = f.Name,
                        TenantId = f.TenantId,
                        TenantName = f.TenantName,
                        IsActive = f.IsActive,
                        RegionKey = f.RegionKey,
                        DateCreated = f.DateCreated,
                        DateModified = f.DateModified,
                        ProfileThumbUrl = f.ThumbUrl
                    })
                };
        }
    }
}