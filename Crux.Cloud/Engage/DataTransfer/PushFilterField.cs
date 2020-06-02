using Crux.Cloud.Engage.Interface;
using Newtonsoft.Json;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class PushFilterField : IPushFilter
    {
        [JsonProperty("field")] public string Field { get; set; }
        [JsonProperty("key")] public string Key { get; set; }
        [JsonProperty("relation")] public string Relation { get; set; }
        [JsonProperty("value")] public string Value { get; set; }
    }
}