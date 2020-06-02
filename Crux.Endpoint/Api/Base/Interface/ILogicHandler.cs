using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Model.Core;

namespace Crux.Endpoint.Api.Base.Interface
{
    public interface ILogicHandler
    {
        User User { get; set; }
        IDataHandler DataHandler { get; set; }
        Task Execute(ICommand command);
    }
}