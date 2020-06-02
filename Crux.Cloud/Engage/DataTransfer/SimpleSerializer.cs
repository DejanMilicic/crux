using Newtonsoft.Json;
using RestSharp.Serializers;
using System.IO;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class SimpleSerializer : ISerializer
    {
        private readonly Newtonsoft.Json.JsonSerializer serializer;

        public SimpleSerializer()
        {
            serializer = new Newtonsoft.Json.JsonSerializer
            {
                MissingMemberHandling = MissingMemberHandling.Ignore,
                NullValueHandling = NullValueHandling.Ignore,
                DefaultValueHandling = DefaultValueHandling.Include
            };
        }

        public string ContentType
        {
            get { return "application/json"; }
            set { }
        }

        public string DateFormat { get; set; }
        public string Namespace { get; set; }
        public string RootElement { get; set; }

        public string Serialize(object obj)
        {
            using var stringWriter = new StringWriter();
            using var jsonTextWriter = new JsonTextWriter(stringWriter)
            {
                Formatting = Formatting.Indented,
                QuoteChar = '"'
            };

            serializer.Serialize(jsonTextWriter, obj);

            var result = stringWriter.ToString();
            return result;
        }
    }
}