using System;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Core;
using Crux.Model.Core.Interface;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class NoteController : SecureController
    {
        public NoteController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get a Note based on Ref Id")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NotableViewModel))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        public async Task<IActionResult> Get(string id)
        {
            var loader = new NotesByRefId {Id = id};
            await DataHandler.Execute(loader);

            if (loader.ResultNotable != null)
            {
                var model = loader.Result;

                if (model == null)
                {
                    model = new Notes
                    {
                        RefId = loader.ResultNotable.Id,
                        TenantId = CurrentUser.TenantId,
                        TenantName = CurrentUser.TenantName,
                        AuthorId = CurrentUser.Id,
                        AuthorName = CurrentUser.Name,
                        Name = loader.ResultNotable.Name,
                        RegionKey = CurrentUser.RegionKey,
                        IsActive = true
                    };

                    var persist = new Persist<Notes> {Model = model};
                    await DataHandler.Execute(persist);

                    loader.ResultNotable.NotesId = persist.Model.Id;

                    var persistNotable = new Persist<INotable>() {Model = loader.ResultNotable};
                    await DataHandler.Execute(persistNotable);

                    await DataHandler.Commit();

                    model = persist.Model;
                }

                return Ok(new NotableViewModel()
                    {Notable = Mapper.Map<ResultOwned>(loader.ResultNotable), Notes = model});
            }

            return NotFound();
        }

        [HttpPost]
        [Description("Set a Note")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NotableViewModel))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        public async Task<IActionResult> Post([FromBody] NoteViewModel viewModel)
        {
            if (string.IsNullOrEmpty(viewModel.Id))
            {
                return NotFound();
            }

            var loader = new NotesByRefId {Id = viewModel.Id};
            await DataHandler.Execute(loader);

            var notes = loader.Result;

            var model = new Note
            {
                AuthorId = CurrentUser.Id,
                AuthorName = CurrentUser.Name,
                AuthorProfileThumbUrl = CurrentUser.ProfileThumbUrl,
                Text = viewModel.Text,
                IsPrivate = viewModel.IsPrivate,
                ForceNotify = viewModel.ForceNotify,
                IsActive = true,
                Counter = 1
            };

            if (viewModel.Counter == 0)
            {
                if (notes.History.Any())
                {
                    model.Counter = notes.History.Max(h => h.Counter) + 1;
                }

                notes.History.Insert(0, model);
                viewModel.Counter = model.Counter;
            }
            else
            {
                model = notes.History.First(n => n.Counter == viewModel.Counter);
                model.Text = viewModel.Text;
                model.IsPrivate = viewModel.IsPrivate;
                model.ForceNotify = viewModel.ForceNotify;
            }

            var persist = new Persist<Notes> {Model = notes};
            await DataHandler.Execute(persist);
            await DataHandler.Commit();

            return Ok(new NotableViewModel() {Notable = Mapper.Map<ResultOwned>(loader.ResultNotable), Notes = notes});
        }

        [HttpGet]
        [Description("Delete a note")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(NotableViewModel))]
        [SwaggerResponse(HttpStatusCode.NotFound, typeof(ProblemDetails))]
        public virtual async Task<IActionResult> Delete(string key, string value)
        {
            var loader = new NotesByRefId {Id = key};
            await DataHandler.Execute(loader);

            if (loader.Result != null)
            {
                var counter = Convert.ToInt32(value);

                if (loader.Result.History.Any(n => n.Counter == counter))
                {
                    var model = loader.Result.History.First(n => n.Counter == counter);
                    loader.Result.History.Remove(model);

                    var persist = new Persist<Notes> {Model = loader.Result};
                    await DataHandler.Execute(persist);
                    await DataHandler.Commit();

                    return Ok(new NotableViewModel()
                        {Notable = Mapper.Map<ResultOwned>(loader.ResultNotable), Notes = loader.Result});
                }
            }

            return NotFound();
        }
    }
}