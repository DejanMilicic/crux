using Newtonsoft.Json.Converters;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class CustomDateTimeConverter : IsoDateTimeConverter
    {
        public CustomDateTimeConverter()
        {
            base.DateTimeFormat = "yyyy-MM-dd HH:mm:ss \"GMT\"zzz";
        }
    }
}