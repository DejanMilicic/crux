using System.Threading.Tasks;
using Crux.Cloud.Blob;
using Crux.Cloud.Core.Interface;
using Crux.Cloud.Engage;
using Crux.Cloud.Media;
using Crux.Model.Core.Confirm;
using Crux.Model.Utility;
using Crux.Test.Base.Interface;
using Microsoft.Extensions.Options;
using Moq;

namespace Crux.Test.Base
{
    public class FakeCloudHandler : ICloudHandler
    {
        public IOptions<Keys> Settings { get; set; } = new FakeSettings();
        public Mock<IMockCloud> Result { get; set; } = new Mock<IMockCloud>();
        public int ExecutedCount { get; set; }
        public bool HasExecuted { get; set; }

        public async Task Execute(ICloudCmd command)
        {
            if (command.GetType().IsSubclassOf(typeof(EmailTemplateCmd)) ||
                command.GetType() == typeof(EmailTemplateCmd))
            {
                if (command is EmailTemplateCmd output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(UploadCmd)) || command.GetType() == typeof(UploadCmd))
            {
                if (command is UploadCmd output)
                {
                    output.Confirm = (ActionConfirm) Result.Object.Execute(command);
                    output.Result = output.Confirm;
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(DeleteCmd)) || command.GetType() == typeof(DeleteCmd))
            {
                if (command is DeleteCmd output)
                {
                    output.Confirm = (ActionConfirm) Result.Object.Execute(command);
                    output.Result = output.Confirm;
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(GiphyCmd)) || command.GetType() == typeof(GiphyCmd))
            {
                if (command is GiphyCmd output)
                {
                    output.Result = (ActionConfirm) Result.Object.Execute(command);
                    output.ImageUrl = "https://image.com/img.jpg";
                    await Register();
                }
            }
            else
            {
                await Register();
            }
        }

        protected async Task Register()
        {
            ExecutedCount++;
            HasExecuted = true;

            await Task.CompletedTask;
        }
    }
}