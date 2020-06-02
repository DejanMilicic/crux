using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Endpoint.Api.Base;
using Crux.Model.Core;
using Crux.Model.Base.Interface;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class CheckProfileImage : LogicCommand
    {
        public IEntityProfile Model { get; set; }

        public override async Task Execute()
        {
            if (!string.IsNullOrEmpty(Model.ProfileId) && !Model.HasProfile)
            {
                var image = new Loader<ImageFile> {Id = Model.ProfileId};
                await DataHandler.Execute(image);

                if (image.Result != null)
                {
                    Model.HasProfile = true;
                    Model.ProfileThumbUrl = image.Result.ThumbUrl;
                }
                else
                {
                    Model.ProfileId = string.Empty;
                }
            }
        }
    }
}