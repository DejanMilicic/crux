using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base.Interface;

namespace Crux.Endpoint.Api.Base
{
    public abstract class LogicCommand : ILogicCommand
    {
        public IDataHandler DataHandler { get; set; }
        public ILogicHandler LogicHandler { get; set; }
        public abstract Task Execute();
    }
}