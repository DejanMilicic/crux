using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Raven.Client.Documents;

namespace Crux.Data.Core.Persist
{
    public class FavRemove : Persist<Fav>
    {
        public User CurrentUser { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }

        public override async Task Execute()
        {
            Model = await Session.Query<Fav, FavIndex>()
                .FirstOrDefaultAsync(u => u.FilterKey == Key && u.UserId == CurrentUser.Id);

            if (Model == null)
            {
                Confirm = ModelConfirm<Fav>.CreateFailure("Fav does not exist");
                return;
            }

            Model.EntityIds.Remove(Value);

            await base.Execute();
        }
    }
}