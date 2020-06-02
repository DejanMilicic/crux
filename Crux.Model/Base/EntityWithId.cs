using Newtonsoft.Json;
using System;
using System.Xml.Serialization;

namespace Crux.Model.Base
{
    [Serializable]
    public abstract class EntityWithId<TId>
    {
        [XmlIgnore] [JsonProperty] public virtual TId Id { get; set; }
    }
}