using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Data.Core.Persist;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;

namespace Crux.Test.Api.External.Handler
{
    public class LoginDataHandler : FakeApiDataEntityHandler<User>
    {
        public UserConfig ResultConfig { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(UserByEmail)) || command.GetType() == typeof(UserByEmail))
            {
                if (command is UserByEmail output)
                {
                    output.Result = (User) Result.Object.Execute(command);
                    output.ResultConfig = ResultConfig;
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(UserSave)) || command.GetType() == typeof(UserSave))
            {
                if (command is UserSave output)
                {
                    output.Model = (User) Result.Object.Execute(command);
                    output.Confirm = ModelConfirm<User>.CreateSuccess(output.Model);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(UserById)) || command.GetType() == typeof(UserById))
            {
                if (command is UserById output)
                {
                    output.Result = (User) Result.Object.Execute(command);
                    output.ResultConfig = ResultConfig;
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