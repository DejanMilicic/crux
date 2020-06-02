using Crux.Cloud.Core;
using Crux.Model.Core.Confirm;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace Crux.Cloud.Media
{
    public class ScrapeImageCmd : CloudCmd
    {
        public string Url { get; set; }
        public Stream Data { get; set; }

        public override async Task Execute()
        {
            try
            {
                using (WebClient webClient = new WebClient())
                {
                    Data = new MemoryStream(await webClient.DownloadDataTaskAsync(new Uri(Url)));
                }

                Result = ActionConfirm.CreateSuccess(Url);
            }
            catch (Exception exception)
            {
                Result = ActionConfirm.CreateFailure(exception.Message);
            }
        }
    }
}