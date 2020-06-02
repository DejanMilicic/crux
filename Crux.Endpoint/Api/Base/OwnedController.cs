using System.Threading.Tasks;
using Crux.Data.Base.Filters;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.ViewModel.Base;
using Crux.Model.Base;

namespace Crux.Endpoint.Api.Base
{
    public abstract class OwnedController<T, TVm, R> : NamedController<T, TVm, R>
        where T : EntityOwned
        where TVm : OwnedViewModel
        where R : ResultOwned
    {
        protected OwnedController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        protected override async Task<T> Parse(TVm viewModel)
        {
            var model = await base.Parse(viewModel);

            if (string.IsNullOrEmpty(model.Id))
            {
                model.TenantId = CurrentUser.TenantId;
                model.TenantName = CurrentUser.TenantName;
                model.AuthorId = CurrentUser.Id;
                model.AuthorName = CurrentUser.Name;
                model.RegionKey = CurrentUser.RegionKey;
            }

            return model;
        }

        protected override bool AuthoriseRead(T model)
        {
            if (!string.IsNullOrEmpty(model.Id))
            {
                return AuthoriseWrite(model);
            }

            return false;
        }

        protected override bool AuthoriseWrite(T model)
        {
            if (model.AuthorId == CurrentUser.Id ||
                (model.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAuth) || CurrentUser.Right.CanSuperuser)
            {
                return true;
            }

            return false;
        }

        protected override R Strip(R item)
        {
            if (item.AuthorId == CurrentUser.Id ||
                (item.TenantId == CurrentUser.TenantId && CurrentUser.Right.CanAuth) || CurrentUser.Right.CanSuperuser)
            {
                item.CanAdd = true;
                item.CanEdit = true;
                item.CanDelete = true;
            }

            item.Searchable = null;
            return item;
        }

        protected virtual void CheckFilter(PagedFilter filter)
        {
            if (!filter.TenantRestrict && !CurrentUser.Right.CanSuperuser)
            {
                filter.TenantRestrict = true;
            }
        }
    }
}