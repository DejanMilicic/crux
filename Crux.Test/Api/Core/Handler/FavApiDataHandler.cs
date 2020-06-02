using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Persist;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;

namespace Crux.Test.Api.Core.Handler
{
    public class FavApiDataHandler : FakeApiDataEntityHandler<Fav>
    {
        public ModelConfirm<Fav> Confirm { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(FavAdd)) || command.GetType() == typeof(FavAdd))
            {
                if (command is FavAdd output)
                {
                    output.Model = (Fav) Result.Object.Execute(command);
                    output.Confirm = Confirm;
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(FavRemove)) || command.GetType() == typeof(FavRemove))
            {
                if (command is FavRemove output)
                {
                    output.Model = (Fav) Result.Object.Execute(command);
                    output.Confirm = Confirm;
                    await Register();
                }
            }
            else
            {
                await base.Execute(command);
            }
        }
    }
}