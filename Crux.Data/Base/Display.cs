using Crux.Data.Base.Results;

namespace Crux.Data.Base
{
    public abstract class Display<T> : ResultCommand<T> where T : ResultNamed
    {
        public string Id { get; set; }
        public T Result { get; set; }
    }
}