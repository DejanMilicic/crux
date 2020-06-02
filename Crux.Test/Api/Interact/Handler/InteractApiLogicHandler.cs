using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.Api.External.Logic;
using Crux.Endpoint.Api.Interact.Logic;
using Crux.Endpoint.ViewModel.External;
using Crux.Model.Core.Confirm;
using Crux.Test.Base;

namespace Crux.Test.Api.Interact.Handler
{
    public class InteractApiLogicHandler : FakeApiLogicHandler
    {
        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(AttendCheck)) || command.GetType() == typeof(AttendCheck))
            {
                if (command is AttendCheck output)
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