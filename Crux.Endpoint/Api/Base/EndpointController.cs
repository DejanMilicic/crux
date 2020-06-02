using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.ViewModel.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Base;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Base
{
    public abstract class EndpointController<T, TVm> : SecureController
        where T : EntityActive
        where TVm : EntityViewModel
    {
        protected EndpointController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Generic Get for edit")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(EntityViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public virtual async Task<IActionResult> Get(string id)
        {
            var entity = await Load(id);
            if (entity == null)
            {
                return NotFound();
            }

            if (AuthoriseRead(entity))
            {
                return Ok(Mapper.Map<TVm>(entity));
            }

            return Unauthorized();
        }

        [HttpPost]
        [Description("Generic Post for edit")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public virtual async Task<IActionResult> Post([FromBody] TVm viewModel)
        {
            var model = await Parse(viewModel);
            return await SaveAndResult(model);
        }

        [HttpGet]
        [Description("Generic Delete for edit")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfirmViewModel))]
        [SwaggerResponse(HttpStatusCode.Unauthorized, typeof(ProblemDetails))]
        public virtual async Task<IActionResult> Delete(string id)
        {
            var loader = new Loader<T> {Id = id};
            await DataHandler.Execute(loader);

            if (loader.Result != null)
            {
                if (AuthoriseWrite(loader.Result))
                {
                    loader.Result.IsActive = false;
                    return await SaveAndResult(loader.Result);
                }
            }

            return Unauthorized();
        }

        protected virtual async Task<T> Parse(TVm viewModel)
        {
            return string.IsNullOrEmpty(viewModel.Id)
                ? Mapper.Map<T>(viewModel)
                : Mapper.Map(viewModel, await Load(viewModel.Id));
        }

        protected async Task<T> Load(string id)
        {
            var loader = new Loader<T> {Id = id};
            await DataHandler.Execute(loader);
            return loader.Result;
        }

        protected async Task<ConfirmViewModel> Save(T model)
        {
            if (AuthoriseWrite(model))
            {
                var persist = new Persist<T> {Model = model};
                await DataHandler.Execute(persist);
                return ConfirmViewModel.CreateSuccess(persist.Model);
            }

            return ConfirmViewModel.CreateFailure("Failed Authorisation on " + model.GetType().Name);
        }

        protected async Task<ConfirmViewModel> SaveAndCommit(T model)
        {
            var confirm = await Save(model);

            if (confirm.Success)
            {
                await DataHandler.Commit();
            }

            return confirm;
        }

        protected async Task<IActionResult> SaveAndResult(T model)
        {
            var confirm = await SaveAndCommit(model);

            if (confirm.Success)
            {
                return Ok(confirm);
            }

            return Unauthorized();
        }

        protected abstract bool AuthoriseRead(T model);

        protected abstract bool AuthoriseWrite(T model);
    }
}