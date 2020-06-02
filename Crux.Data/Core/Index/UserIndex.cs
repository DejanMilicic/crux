using System.Collections.Generic;
using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class UserIndex : AbstractIndexCreationTask<User, UserMaster>
    {
        public UserIndex()
        {
            Map = users => from user in users
                where user.IsActive
                select new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.TenantId,
                    user.AuthorId,
                    user.RegionKey,
                    user.IsActive,
                    user.DateCreated,
                    user.DateModified,
                    user.ConfigId,
                    user.TenantName,
                    user.AuthorName,
                    user.HasProfile,
                    user.ProfileId,
                    user.ProfileThumbUrl,
                    user.Right.CanAuth,
                    user.Right.CanAdmin,
                    user.Right.CanSuperuser,
                    HasPhone = !string.IsNullOrEmpty(user.EncryptedPhone),
                    Searchable = new List<string> {user.Name, user.Email, user.TenantName}
                };

            StoreAllFields(FieldStorage.Yes);
            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            Priority = IndexPriority.High;
        }
    }
}