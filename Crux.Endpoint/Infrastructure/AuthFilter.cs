using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Base;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Crux.Endpoint.Infrastructure
{
    public class AuthFilter : ActionFilterAttribute
    {
        private IDataHandler DataHandler { get; set; }

        public AuthFilter(IDataHandler dataHandler)
        {
            DataHandler = dataHandler;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var controller = (SecureController) context.Controller;
            var query = new UserById
                {Id = controller.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value};
            await DataHandler.Execute(query);
            controller.CurrentUser = query.Result;
            controller.CurrentConfig = query.ResultConfig;
            await base.OnActionExecutionAsync(context, next);
        }
    }
}