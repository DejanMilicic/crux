using Crux.Model.Utility;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Crux.Cloud.Core.Interface
{
    public interface ICloudHandler
    {
        IOptions<Keys> Settings { get; set; }
        Task Execute(ICloudCmd command);
    }
}