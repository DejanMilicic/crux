using Newtonsoft.Json;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class AndroidBackgroundLayoutField
    {
        [JsonProperty("image")] public string Image { get; set; }
        [JsonProperty("headings_color")] public string HeadingsColor { get; set; }
        [JsonProperty("contents_color")] public string ContentsColor { get; set; }
    }
}