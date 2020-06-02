using Crux.Cloud.Engage.DataTransfer;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Crux.Cloud.Engage
{
    public class TemplaterCmd
    {
        public IList<object> Models { get; set; } = new List<object>();
        public string Template { get; set; }
        public IList<TemplateKey> Keys { get; set; } = new List<TemplateKey>();
        public IList<TemplateKey> Extra { get; set; } = new List<TemplateKey>();
        public string Result { get; set; }

        public async Task Execute()
        {
            var resultBuilder = new StringBuilder(Template);

            foreach (var model in Models)
            {
                var properties = model.GetType().GetProperties();

                foreach (var property in properties)
                {
                    var tag = model.GetType().Name + "." + property.Name;
                    var value = Convert.ToString(property.GetValue(model, null));

                    resultBuilder = resultBuilder.Replace(@"[[" + tag + @"]]", value.Trim());
                }
            }

            foreach (var key in Keys)
            {
                var tag = key.Key;
                var value = key.Value;

                resultBuilder = resultBuilder.Replace(@"[[" + tag + @"]]", value.Trim());
            }

            foreach (var key in Extra)
            {
                var tag = key.Key;
                var value = key.Value;

                resultBuilder = resultBuilder.Replace(@"[[" + tag + @"]]", value.Trim());
            }

            Result = resultBuilder.ToString();

            await Task.CompletedTask;
        }
    }
}