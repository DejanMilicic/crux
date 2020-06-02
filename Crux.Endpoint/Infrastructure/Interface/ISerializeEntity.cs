using System;

namespace Crux.Endpoint.Infrastructure.Interface
{
    public interface ISerializeEntity
    {
        string ToJson(Type type, object entity);
        string ToJson<T>(T entity) where T : class;
    }
}