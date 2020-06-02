using AutoMapper;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Crux.Endpoint.Api.Base
{
    public abstract class HandledController : Controller
    {
        protected HandledController(IDataHandler dataHandler, ILogicHandler logicHandler)
        {
            logicHandler.DataHandler = dataHandler;

            DataHandler = dataHandler;
            LogicHandler = logicHandler;
            Mapper = new Mapper(AutoMapperConfig.Configure());
        }

        public IDataHandler DataHandler { get; set; }
        public ILogicHandler LogicHandler { get; set; }
        public IMapper Mapper { get; set; }
    }
}