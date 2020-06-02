using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.Api.External.Logic;
using Crux.Endpoint.ViewModel.External;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;

namespace Crux.Test.Api.Core.Handler
{
    public class CoreApiLogicHandler : FakeApiLogicHandler
    {
        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(ChangeConfig)) || command.GetType() == typeof(ChangeConfig))
            {
                if (command is ChangeConfig output)
                {
                    output.Result = (bool) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(FileDelete)) || command.GetType() == typeof(FileDelete))
            {
                if (command is FileDelete output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(ProcessFile)) || command.GetType() == typeof(ProcessFile))
            {
                if (command is ProcessFile output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(SimpleNotify)) || command.GetType() == typeof(SimpleNotify))
            {
                if (command is SimpleNotify output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(SignupUser)) || command.GetType() == typeof(SignupUser))
            {
                if (command is SignupUser output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(SigninAuth)) || command.GetType() == typeof(SigninAuth))
            {
                if (command is SigninAuth output)
                {
                    output.Result = (AuthViewModel) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(ProcessImage)) || command.GetType() == typeof(ProcessImage))
            {
                if (command is ProcessImage output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(WriteToken)) || command.GetType() == typeof(WriteToken))
            {
                if (command is WriteToken output)
                {
                    output.Result = (bool) Result.Object.Execute(command);
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