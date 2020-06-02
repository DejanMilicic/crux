using Crux.Cloud.Engage.Interface;
using Newtonsoft.Json;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class PushFilterOperator : IPushFilter
    {
        [JsonProperty("operator")] public string Operator { get; set; }
    }
}