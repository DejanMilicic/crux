using Crux.Model.Core;
using System.Threading.Tasks;

namespace Crux.Cloud.Engage
{
    public class PushTemplateCmd : PushCmd
    {
        public TemplaterCmd Processor { get; set; }
        public NotifyTemplate Template { get; set; }

        public override async Task Execute()
        {
            Processor.Extra.Clear();

            Processor.Template = Template.PushAction;
            await Processor.Execute();
            Action = Processor.Result;

            Processor.Template = Template.PushMessage;
            await Processor.Execute();
            Message = Processor.Result;

            Processor.Template = Template.PushTitle;
            await Processor.Execute();
            Title = Processor.Result;

            await base.Execute();
        }
    }
}