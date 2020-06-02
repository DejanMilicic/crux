using System.Threading.Tasks;

namespace Crux.Data.Base.Interface
{
    public interface ICommand
    {
        Task Execute();
    }
}