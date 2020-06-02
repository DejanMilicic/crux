using Crux.Cloud.Core;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Threading.Tasks;

namespace Crux.Cloud.Blob
{
    public class ContainerCmd : AzureCmd
    {
        public string ContainerName { get; set; }
        public CloudBlobContainer Container { get; set; }

        public override async Task Execute()
        {
            await base.Execute();
            Container = Account.CreateCloudBlobClient().GetContainerReference(ContainerName);
        }
    }
}