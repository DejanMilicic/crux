using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Persist;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class FavController : SecureController
    {
        public FavController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Add a Favourite to Current User")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(bool))]
        public async Task<IActionResult> Add(string key, string value)
        {
            var persist = new FavAdd {CurrentUser = CurrentUser, Key = key, Value = value};
            await DataHandler.Execute(persist);

            if (persist.Confirm.Success)
            {
                await DataHandler.Commit();
            }

            return Ok(true);
        }

        [HttpGet]
        [Description("Remove a Favourite from Current User")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(bool))]
        public async Task<IActionResult> Remove(string key, string value)
        {
            var persist = new FavRemove {CurrentUser = CurrentUser, Key = key, Value = value};
            await DataHandler.Execute(persist);

            if (persist.Confirm.Success)
            {
                await DataHandler.Commit();
            }

            return Ok(false);
        }
    }
}