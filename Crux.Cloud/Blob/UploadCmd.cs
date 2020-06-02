using Crux.Model.Core.Confirm;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Crux.Cloud.Blob
{
    public class UploadCmd : ContainerCmd
    {
        public string Key { get; set; }
        public string ContentType { get; set; }
        public Stream Data { get; set; } = new MemoryStream();
        public Uri Url { get; set; }
        public long Length { get; set; }
        public ActionConfirm Confirm { get; set; }

        public override async Task Execute()
        {
            try
            {
                await base.Execute();
                var blob = Container.GetBlockBlobReference(Key.ToLower());

                blob.Properties.ContentType = ContentType;
                Data.Position = 0;

                await blob.UploadFromStreamAsync(Data);

                Url = blob.Uri;
                Length = blob.Properties.Length;
                Confirm = ActionConfirm.CreateSuccess(Key.ToLower());
            }
            catch (Exception exception)
            {
                Confirm = ActionConfirm.CreateFailure(exception.Message);
            }
        }
    }
}