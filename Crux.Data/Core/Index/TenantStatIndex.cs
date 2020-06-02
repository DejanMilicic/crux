using System;
using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Base;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class TenantStatIndex : AbstractMultiMapIndexCreationTask<TenantStat>
    {
        public TenantStatIndex()
        {
            AddMap<Tenant>(tenants => from tenant in tenants
                where tenant.IsActive
                select new
                {
                    tenant.Id,
                    tenant.Name,
                    tenant.TenantId,
                    tenant.AuthorId,
                    tenant.RegionKey,
                    tenant.IsActive,
                    tenant.DateCreated,
                    tenant.DateModified,
                    FileCount = 0,
                    FileSize = 0,
                    UserCount = 0,
                    Searchable = tenant.Name
                });

            AddMapForAll<StoredFile>(files => from file in files
                where file.IsActive
                select new
                {
                    Id = file.TenantId,
                    Name = (string) null,
                    TenantId = (string) null,
                    AuthorId = (string) null,
                    RegionKey = (string) null,
                    IsActive = (bool?) null,
                    DateCreated = (DateTime?) null,
                    DateModified = (DateTime?) null,
                    FileCount = 1,
                    FileSize = file.Length,
                    UserCount = 0,
                    Searchable = (string) null
                });

            AddMap<User>(users => from user in users
                where user.IsActive
                select new
                {
                    Id = user.TenantId,
                    Name = (string) null,
                    TenantId = (string) null,
                    AuthorId = (string) null,
                    RegionKey = (string) null,
                    IsActive = (bool?) null,
                    DateCreated = (DateTime?) null,
                    DateModified = (DateTime?) null,
                    FileCount = 0,
                    FileSize = 0,
                    UserCount = 1,
                    Searchable = (string) null
                });

            Reduce = results => from result in results
                group result by result.Id
                into g
                select new
                {
                    Id = g.Key,
                    Name = g.Select(x => x.Name).First(x => x != null),
                    TenantId = g.Select(x => x.TenantId).First(x => x != null),
                    AuthorId = g.Select(x => x.AuthorId).First(x => x != null),
                    RegionKey = g.Select(x => x.RegionKey).First(x => x != null),
                    IsActive = g.Select(x => x.IsActive).First(x => x != null),
                    DateCreated = g.Select(x => x.DateCreated).First(x => x != null && x > DateTime.MinValue),
                    DateModified = g.Select(x => x.DateModified).First(x => x != null && x > DateTime.MinValue),
                    FileCount = g.Sum(x => x.FileCount),
                    FileSize = g.Sum(x => x.FileSize),
                    UserCount = g.Sum(x => x.UserCount),
                    Searchable = g.Select(x => x.Searchable).First(x => x != null)
                };

            StoreAllFields(FieldStorage.Yes);
            Priority = IndexPriority.Low;
        }
    }
}