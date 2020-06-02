using Crux.Cloud.Core;
using Crux.Model.Core.Confirm;
using System;
using System.Threading.Tasks;

namespace Crux.Cloud.Blob
{
    public class MoveFileCmd : AzureCmd
    {
        public ContainerCmd SourceContainerCmd { get; set; }
        public ContainerCmd DestContainerCmd { get; set; }
        public string SourceKey { get; set; }
        public string DestKey { get; set; }
        public ActionConfirm Confirm { get; set; }

        public override async Task Execute()
        {
            try
            {
                await SourceContainerCmd.Execute();
                await DestContainerCmd.Execute();

                var source = SourceContainerCmd.Container.GetBlockBlobReference(SourceKey.ToLower());
                var dest = DestContainerCmd.Container.GetBlockBlobReference(DestKey.ToLower());

                dest.Properties.ContentType = source.Properties.ContentType;
                await dest.StartCopyAsync(source);

                Confirm = ActionConfirm.CreateSuccess(DestKey.ToLower());
            }
            catch (Exception exception)
            {
                Confirm = ActionConfirm.CreateFailure(exception.Message);
            }
        }
    }
}