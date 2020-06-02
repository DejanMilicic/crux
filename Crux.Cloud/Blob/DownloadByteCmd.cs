using System.Threading.Tasks;

namespace Crux.Cloud.Blob
{
    public class DownloadByteCmd : ContainerCmd
    {
        public string Key { get; set; }
        public long Length { get; set; }
        public byte[] Data { get; set; }

        public override async Task Execute()
        {
            await base.Execute();
            var blob = Container.GetBlockBlobReference(Key.ToLower());
            Data = new byte[Length];
            await blob.DownloadToByteArrayAsync(Data, 0);
        }
    }
}