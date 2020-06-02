using Crux.Model.Core.Confirm;
using System;
using System.Threading.Tasks;

namespace Crux.Cloud.Blob
{
    public class DeleteCmd : ContainerCmd
    {
        public string Key { get; set; }
        public ActionConfirm Confirm { get; set; }

        public override async Task Execute()
        {
            try
            {
                await base.Execute();

                var blob = Container.GetBlockBlobReference(Key.ToLower());
                await blob.DeleteAsync();
                Confirm = ActionConfirm.CreateSuccess(Key);
            }
            catch (Exception exception)
            {
                Confirm = ActionConfirm.CreateFailure(exception.Message);
            }
        }
    }
}