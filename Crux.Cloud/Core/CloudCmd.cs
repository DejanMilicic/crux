using Crux.Cloud.Core.Interface;
using Crux.Model.Core.Confirm;
using Crux.Model.Utility;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Crux.Cloud.Core
{
    public abstract class CloudCmd : ICloudCmd
    {
        public IOptions<Keys> Settings { get; set; }
        public ActionConfirm Result { get; set; }
        public abstract Task Execute();
    }
}