using Crux.Cloud.Core.Interface;
using Crux.Model.Utility;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Crux.Cloud.Core
{
    public class CloudHandler : ICloudHandler
    {
        public CloudHandler(IOptions<Keys> settings)
        {
            Settings = settings;
        }

        public IOptions<Keys> Settings { get; set; }

        public async Task Execute(ICloudCmd command)
        {
            command.Settings = Settings;
            await command.Execute();
        }
    }
}