using System;

namespace Crux.Endpoint.Infrastructure.Interface
{
    public interface IDeserializeEntity
    {
        object FromJson(Type type, string value);
        T FromJson<T>(string value) where T : class;
    }
}