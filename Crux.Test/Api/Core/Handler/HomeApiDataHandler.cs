using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Query;
using Crux.Data.Interact.Result;
using Crux.Test.Base;
using Crux.Test.Base.Interface;
using Moq;
using Raven.Client.Documents.Session;

namespace Crux.Test.Api.Core.Handler
{
    public class HomeApiDataHandler : BaseHandler, IDataHandler
    {
        public Mock<IMockHandler> Result { get; set; } = new Mock<IMockHandler>();
        public IAsyncDocumentSession Session { get; set; }
        public bool HasCommitted { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType() == typeof(HomeComposite))
            {
                if (command is HomeComposite output)
                {
                    output.Result = (HomeDisplay)Result.Object.Execute(command);
                }
            }

            if (command.GetType() == typeof(StatsComposite))
            {
                if (command is StatsComposite output)
                {
                    output.Result = (StatsDisplay)Result.Object.Execute(command);
                }
            }

            await Register();
        }

        protected async Task Register()
        {
            ExecutedCount++;
            HasExecuted = true;

            await Task.CompletedTask;
        }

        public virtual async Task Commit()
        {
            HasCommitted = true;
            await Task.CompletedTask;
        }

    }
}