using System.Threading.Tasks;
using Raven.Client.Documents.Session;

namespace Crux.Data.Base.Interface
{
    public interface IDataHandler : IHandler
    {
        IAsyncDocumentSession Session { get; set; }
        Task Commit();
    }
}