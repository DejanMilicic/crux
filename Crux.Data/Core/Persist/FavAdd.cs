using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Raven.Client.Documents;

namespace Crux.Data.Core.Persist
{
    public class FavAdd : Persist<Fav>
    {
        public User CurrentUser { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        public override async Task Execute()
        {
            Model = new Fav
            {
                FilterKey = Key,
                UserId = CurrentUser.Id,
                TenantId = CurrentUser.TenantId,
                TenantName = CurrentUser.TenantName,
                AuthorId = CurrentUser.Id,
                AuthorName = CurrentUser.Name,
                RegionKey = CurrentUser.RegionKey,
                Name = CurrentUser.Name + " -> " + Key
            };

            var existing = await Session.Query<Fav, FavIndex>()
                .FirstOrDefaultAsync(u => u.FilterKey == Key && u.UserId == CurrentUser.Id);

            if (existing != null)
            {
                Model = existing;
            }

            if (Model.EntityIds.Any(f => f == Value))
            {
                Confirm = ModelConfirm<Fav>.CreateFailure("Already Exists");
                return;
            }

            Model.EntityIds.Add(Value);

            await base.Execute();
        }
    }
}