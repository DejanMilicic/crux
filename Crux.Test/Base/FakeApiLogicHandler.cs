using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Test.Base.Interface;
using Moq;

namespace Crux.Test.Base
{
    public class FakeApiLogicHandler : BaseHandler, ILogicHandler
    {
        public Mock<IMockHandler> Result { get; set; } = new Mock<IMockHandler>();
        public IDataHandler DataHandler { get; set; }

        public override async Task Execute(ICommand command)
        {
            await Register();
        }

        protected async Task Register()
        {
            ExecutedCount++;
            HasExecuted = true;

            await Task.CompletedTask;
        }
    }
}