using System.Threading.Tasks;
using Crux.Model.Base.Interface;

namespace Crux.Data.Base
{
    public abstract class Single<T> : DataCommand<T> where T : IEntity
    {
        public T Result { get; set; }
        public abstract override Task Execute();
    }
}