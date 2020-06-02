using Newtonsoft.Json;

namespace Crux.Cloud.Media.DataTransfer
{
    public class GiphyGif
    {
        [JsonProperty("data")] public Data Data { get; set; }
    }

    public class Data
    {
        [JsonProperty("id")] public string Id { get; set; } = string.Empty;
        [JsonProperty("embed_url")] public string EmbedUrl { get; set; } = string.Empty;
        [JsonProperty("images")] public Images Images { get; set; }
    }

    public class Images
    {
        [JsonProperty("fixed_width")] public Image FixedWidth { get; set; }
    }

    public class Image
    {
        [JsonProperty("url")] public string Url { get; set; } = string.Empty;
    }
}