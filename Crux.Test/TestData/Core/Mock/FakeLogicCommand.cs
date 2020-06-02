namespace Crux.Test.TestData.Core.Mock
{
    using System.Threading.Tasks;
    using Data.Base.Interface;
    using Endpoint.Api.Base.Interface;

    public class FakeLogicCommand : ILogicCommand
    {
        public IDataHandler DataHandler { get; set; }
        public ILogicHandler LogicHandler { get; set; }

        public async Task Execute()
        {
            await Task.CompletedTask;
        }
    }
}