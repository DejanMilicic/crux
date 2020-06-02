using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Model.Core;
using Crux.Test.Base;

namespace Crux.Test.Api.External.Handler
{
    public class SignupDataHandler : FakeApiDataEntityHandler<User>
    {
        public UserConfig ResultConfig { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(TenantByEntryKey)) ||
                command.GetType() == typeof(TenantByEntryKey))
            {
                if (command is TenantByEntryKey output)
                {
                    output.Result = (Tenant) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(UserByEmail)) || command.GetType() == typeof(UserByEmail))
            {
                if (command is UserByEmail output)
                {
                    output.Result = (User) Result.Object.Execute(command);
                    output.ResultConfig = ResultConfig;
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