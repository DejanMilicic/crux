using Microsoft.WindowsAzure.Storage;

namespace Crux.Cloud.Core.Interface
{
    public interface IAzureCmd : ICloudCmd
    {
        CloudStorageAccount Account { get; set; }
        string AccountConnection { get; set; }
    }
}