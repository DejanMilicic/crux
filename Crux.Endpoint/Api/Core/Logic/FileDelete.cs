using System.Threading.Tasks;
using Crux.Cloud.Blob;
using Crux.Cloud.Core.Interface;
using Crux.Data.Base;
using Crux.Endpoint.Api.Base;
using Crux.Model.Base;
using Crux.Model.Core.Confirm;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class FileDelete : LogicCommand
    {
        public ICloudHandler CloudHandler { get; set; }
        public VisibleFile File { get; set; }
        public ActionConfirm Result { get; set; }

        public override async Task Execute()
        {
            var deleteThumb = new DeleteCmd {Key = File.ThumbKey, ContainerName = "thb"};
            await CloudHandler.Execute(deleteThumb);

            if (!deleteThumb.Confirm.Success)
            {
                Result = ActionConfirm.CreateFailure("Thumb blob failed to delete -> " + File.Id);
                return;
            }

            var delete = new DeleteCmd {Key = File.UrlKey};

            if (File.IsImage)
            {
                delete.ContainerName = "ful";
            }

            if (File.IsVideo)
            {
                delete.ContainerName = "vid";
            }

            if (File.IsDocument)
            {
                delete.ContainerName = "doc";
            }

            await CloudHandler.Execute(delete);

            var persist = new Delete<VisibleFile> {Id = File.Id};
            await DataHandler.Execute(persist);

            Result = ActionConfirm.CreateSuccess("File deleted");
        }
    }
}