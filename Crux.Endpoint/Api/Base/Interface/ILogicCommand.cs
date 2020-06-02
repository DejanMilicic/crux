using Crux.Data.Base.Interface;

namespace Crux.Endpoint.Api.Base.Interface
{
    public interface ILogicCommand : ICommand
    {
        IDataHandler DataHandler { get; set; }
        ILogicHandler LogicHandler { get; set; }
    }
}