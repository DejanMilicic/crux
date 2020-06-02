using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Query;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Crux.Test.Base;

namespace Crux.Test.Api.Core.Handler
{
    public class UserConfigApiDataHandler : FakeApiDataEntityHandler<UserConfig>
    {
        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(TenantDisplayById)) ||
                command.GetType() == typeof(TenantDisplayById))
            {
                if (command is TenantDisplayById output)
                {
                    output.Result = (TenantDisplay) Result.Object.Execute(command);
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