using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Infrastructure;
using Crux.Model.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Crux.Endpoint.Api.Base
{
    [Authorize]
    [ServiceFilter(typeof(AuthFilter))]
    public abstract class SecureController : HandledController
    {
        protected SecureController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        public User CurrentUser { get; set; }
        public UserConfig CurrentConfig { get; set; }
    }
}