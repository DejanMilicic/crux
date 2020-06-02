namespace Crux.Model.Base
{
    public class StoredFile : EntityOwned
    {
        public long Length { get; set; } = 0;
        public string LoadType { get; set; } = string.Empty;
        public string FullUrl { get; set; } = string.Empty;
        public string UrlKey { get; set; } = string.Empty;
        public string ThumbKey { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public string Extension { get; set; } = string.Empty;
    }
}