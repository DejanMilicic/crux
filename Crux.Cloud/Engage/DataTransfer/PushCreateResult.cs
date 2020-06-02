using RestSharp.Deserializers;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class PushCreateResult
    {
        [DeserializeAs(Name = "recipients")] public int Recipients { get; set; }
        [DeserializeAs(Name = "id")] public string Id { get; set; }
    }
}