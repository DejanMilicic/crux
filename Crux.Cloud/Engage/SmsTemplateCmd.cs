using Crux.Model.Core;
using System.Threading.Tasks;

namespace Crux.Cloud.Engage
{
    public class SmsTemplateCmd : SmsCmd
    {
        public TemplaterCmd Processor { get; set; }
        public NotifyTemplate Template { get; set; }

        public override async Task Execute()
        {
            Processor.Extra.Clear();

            Processor.Template = Template.SmsMessage;
            await Processor.Execute();
            Message = Processor.Result;

            await base.Execute();
        }
    }
}