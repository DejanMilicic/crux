using Crux.Model.Core.Confirm;
using Crux.Model.Utility;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Crux.Cloud.Core.Interface
{
    public interface ICloudCmd
    {
        public IOptions<Keys> Settings { get; set; }
        ActionConfirm Result { get; set; }
        Task Execute();
    }
}