using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;

namespace Crux.Test.Api.External.Handler
{
    public class ForgotDataHandler : FakeApiDataEntityHandler<User>
    {
        public User ResultUser { get; set; }
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
            else if (command.GetType().IsSubclassOf(typeof(Persist<User>)) || command.GetType() == typeof(Persist<User>))
            {
                if (command is Persist<User> output)
                {
                    output.Confirm = ModelConfirm<User>.CreateSuccess(ResultUser);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Persist<UserConfig>)) || command.GetType() == typeof(Persist<UserConfig>))
            {
                if (command is Persist<UserConfig> output)
                {
                    output.Confirm = ModelConfirm<UserConfig>.CreateSuccess(ResultConfig);
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