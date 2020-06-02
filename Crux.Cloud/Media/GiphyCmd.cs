using Crux.Cloud.Core;
using Crux.Cloud.Media.DataTransfer;
using Crux.Model.Core.Confirm;
using RestSharp;
using System.Threading.Tasks;

namespace Crux.Cloud.Media
{
    public class GiphyCmd : CloudCmd
    {
        public string Tags { get; set; }
        public string ImageUrl { get; set; }

        public override async Task Execute()
        {
            var tenant = new RestClient(Settings.Value.GiphyEndpoint);
            var request = new RestRequest(Method.GET);
            request.AddHeader("api_key", Settings.Value.GiphyApiKey);
            request.AddHeader("tag", Tags);
            var result = await tenant.ExecuteAsync<GiphyGif>(request);
            ImageUrl = result.Data.Data.Images.FixedWidth.Url;
            Result = ActionConfirm.CreateSuccess(ImageUrl);
        }
    }
}