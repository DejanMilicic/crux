using Crux.Cloud.Core.Interface;
using Crux.Model.Core.Confirm;
using Microsoft.WindowsAzure.Storage;
using System.Threading.Tasks;

namespace Crux.Cloud.Core
{
    public class AzureCmd : CloudCmd, IAzureCmd
    {
        public CloudStorageAccount Account { get; set; }
        public string AccountConnection { get; set; }

        public override async Task Execute()
        {
            if (!string.IsNullOrEmpty(AccountConnection))
            {
                Account = CloudStorageAccount.Parse(AccountConnection);
            }
            else if (Account == null)
            {
                Account = CloudStorageAccount.Parse(Settings.Value.AzureAccountKey);
            }

            Result = ActionConfirm.CreateSuccess("ok");
            await Task.CompletedTask;
        }
    }
}