using Crux.Cloud.Engage.DataTransfer;
using Crux.Model.Core;
using System.Threading.Tasks;

namespace Crux.Cloud.Engage
{
    public class EmailTemplateCmd : EmailCmd
    {
        public TemplaterCmd Processor { get; set; }
        public NotifyTemplate Template { get; set; }

        public override async Task Execute()
        {
            Processor.Extra.Clear();
            Processor.Extra.Add(new TemplateKey() {Key = "[[Title]]", Value = Template.EmailTitle});

            Processor.Template = Template.EmailSubject;
            await Processor.Execute();
            Subject = Processor.Result;

            Processor.Template = Template.EmailText;
            await Processor.Execute();
            BodyText = Processor.Result;

            Processor.Template = Template.EmailHtml;
            await Processor.Execute();
            BodyHtml = Processor.Result;

            Processor.Extra.Clear();
            await base.Execute();
        }
    }
}