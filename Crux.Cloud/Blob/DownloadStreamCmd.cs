using System.IO;
using System.Threading.Tasks;

namespace Crux.Cloud.Blob
{
    public class DownloadStreamCmd : ContainerCmd
    {
        public string Key { get; set; }
        public Stream Data { get; set; } = new MemoryStream();

        public override async Task Execute()
        {
            await base.Execute();
            var blob = Container.GetBlockBlobReference(Key.ToLower());
            await blob.DownloadToStreamAsync(Data);
            Data.Position = 0;
        }
    }
}