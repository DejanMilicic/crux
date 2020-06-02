using Crux.Model.Core;
using System.Threading.Tasks;

namespace Crux.Data.Base.Interface
{
    public interface IHandler
    {
        User User { get; set; }
        Task Execute(ICommand command);
    }
}