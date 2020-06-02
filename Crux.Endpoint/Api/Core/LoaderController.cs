using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Cloud.Core.Interface;
using Crux.Cloud.Media;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class LoaderController : SecureController
    {
        public LoaderController(IDataHandler dataHandler, ICloudHandler cloudHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
            CloudHandler = cloudHandler;
        }

        public ICloudHandler CloudHandler { get; set; }

        [HttpPost]
        [Description("Uploads a file for storage")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(VisibleViewModel))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        public async Task<IActionResult> Upload([FromForm] IFormFile file)
        {
            var process = new ProcessFile {CloudHandler = CloudHandler, CurrentUser = CurrentUser, Source = file};
            await LogicHandler.Execute(process);

            if (process.Result.Success)
            {
                await DataHandler.Commit();
                var result = Mapper.Map<VisibleViewModel>(process.Model);
                return Json(result);
            }

            return NotFound();
        }

        [HttpGet]
        [Description("Gets a fun gif")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(string))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        public async Task<IActionResult> Gif(string id)
        {
            var gif = new GiphyCmd {Tags = id};
            await CloudHandler.Execute(gif);

            if (gif.Result.Success)
            {
                return Json(gif.ImageUrl);
            }

            return NotFound();
        }
    }
}