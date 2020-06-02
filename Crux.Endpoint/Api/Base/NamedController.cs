using System.Collections.Generic;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.ViewModel.Base;
using Crux.Model.Base;

namespace Crux.Endpoint.Api.Base
{
    public abstract class NamedController<T, TVm, R> : EndpointController<T, TVm>
        where T : EntityNamed
        where TVm : NamedViewModel
        where R : ResultNamed
    {
        protected NamedController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        protected virtual IEnumerable<R> Secure(IEnumerable<R> list)
        {
            foreach (var item in list)
            {
                Strip(item);
            }

            return list;
        }

        protected abstract R Strip(R item);
    }
}