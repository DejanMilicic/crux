using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Model.Core;
using Raven.Client;
using Raven.Client.Documents.Operations;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Core.Persist
{
    public class UserSave : Persist<User>
    {
        public UserConfig ResultConfig { get; set; }
        public string Original { get; set; }

        public override async Task Execute()
        {
            await base.Execute();

            if (string.IsNullOrEmpty(Model.ConfigId))
            {
                var config = new UserConfig
                {
                    Name = Model.Name,
                    UserId = Confirm.Identity,
                    TenantId = Model.TenantId,
                    TenantName = Model.TenantName,
                    AuthorId = Model.AuthorId,
                    AuthorName = Model.AuthorName,
                    RegionKey = Model.RegionKey
                };

                await Session.StoreAsync(config);

                Model.ConfigId = config.Id;
                ResultConfig = config;
                await base.Execute();
            }
            else
            {
                if (Original != Model.Name)
                {
                    var authorQuery = new IndexQuery
                    {
                        Query =
                            @"from index 'OwnedMasterIndex' as entity 
                        where entity.AuthorId = $authorId 
                        update { entity.AuthorName =  $authorName }",
                        QueryParameters = new Parameters
                        {
                            {"authorId", Model.Id},
                            {"authorName", Model.Name}
                        }
                    };

                    await Session.Advanced.DocumentStore.Operations.SendAsync(
                        new PatchByQueryOperation(authorQuery, new QueryOperationOptions() {AllowStale = true}));
                }
            }
        }
    }
}