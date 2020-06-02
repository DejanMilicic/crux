using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Model.Base.Interface;
using Raven.Client.Documents.Session;

namespace Crux.Data.Base
{
    public abstract class DataCommand<T> : IDataCommand where T : IEntity
    {
        public IAsyncDocumentSession Session { get; set; }
        public abstract Task Execute();
    }
}