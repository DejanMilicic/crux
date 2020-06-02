using System;
using Crux.Endpoint.Infrastructure.Interface;
using Newtonsoft.Json;

namespace Crux.Endpoint.Infrastructure
{
    public class ModelSerializer : IDeserializeEntity, ISerializeEntity
    {
        public object FromJson(Type type, string value)
        {
            return JsonConvert.DeserializeObject(value, type);
        }

        public T FromJson<T>(string value) where T : class
        {
            return JsonConvert.DeserializeObject<T>(value);
        }

        public string ToJson(Type type, object entity)
        {
            return JsonConvert.SerializeObject(entity);
        }

        public string ToJson<T>(T entity) where T : class
        {
            return JsonConvert.SerializeObject(entity);
        }
    }
}