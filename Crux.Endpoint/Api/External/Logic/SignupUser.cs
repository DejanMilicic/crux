using System.Threading.Tasks;
using Crux.Cloud.Core.Interface;
using Crux.Data.Base;
using Crux.Data.Core.Persist;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.External;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Model.Interact;
using Crux.Model.Utility;

namespace Crux.Endpoint.Api.External.Logic
{
    public class SignupUser : LogicCommand, IProcessCommand
    {
        public ICloudHandler CloudHandler { get; set; }
        public SignupViewModel Input { get; set; }
        public ActionConfirm Result { get; set; }
        public AuthViewModel ResultAuth { get; set; } = new AuthViewModel();

        public override async Task Execute()
        {
            var regionKey = "GLA";
            var tenant = new Tenant()
            {
                Name = Input.TenantName, TenantName = Input.TenantName, EntryKey = StringHelper.GenerateCode(16),
                AuthorName = Input.Name, RegionKey = regionKey
            };
            var isNew = true;

            if (string.IsNullOrEmpty(Input.TenantId))
            {
                var persistClient = new Persist<Tenant>() {Model = tenant};
                await DataHandler.Execute(persistClient);
                tenant = persistClient.Model;
            }
            else
            {
                var loaderClient = new Loader<Tenant>() {Id = Input.TenantId};
                await DataHandler.Execute(loaderClient);
                tenant = loaderClient.Result;
                isNew = false;
            }

            if (tenant != null && !string.IsNullOrEmpty(tenant.Id))
            {
                var user = new User()
                {
                    TenantId = tenant.Id, TenantName = Input.TenantName, Name = Input.Name, Email = Input.Email,
                    EncryptedPwd = EncryptHelper.Encrypt(Input.Pwd), AuthorName = Input.Name,
                    Right = new UserRight() {CanAuth = isNew, CanAdmin = isNew, CanSuperuser = false},
                    RegionKey = regionKey
                };

                var persistUser = new UserSave {Model = user};
                await DataHandler.Execute(persistUser);

                if (persistUser.Confirm.Success)
                {
                    if (isNew)
                    {
                        tenant.AuthorId = persistUser.Model.Id;
                        tenant.TenantId = tenant.Id;

                        var persistClient = new Persist<Tenant>() {Model = tenant};
                        await DataHandler.Execute(persistClient);
                        tenant = persistClient.Model;

                        var meetingType = new MeetingType()
                        {
                            TenantId = tenant.Id, TenantName = tenant.Name, Name = "Standard", IsRecur = false,
                            Pretext = "Standard Meeting Type", RegionKey = regionKey, Prename = "Meeting",
                            AuthorId = persistUser.Model.Id, AuthorName = persistUser.Model.Name
                        };
                        var persistType = new Persist<MeetingType>() {Model = meetingType};
                        await DataHandler.Execute(persistType);
                    }

                    persistUser.Model.AuthorId = persistUser.Model.Id;
                    await DataHandler.Execute(persistUser);
                    await DataHandler.Commit();

                    var signin = new SigninAuth()
                    {
                        Tenant = tenant, Login = persistUser.Model, LogicHandler = LogicHandler,
                        DataHandler = DataHandler, Config = persistUser.ResultConfig, Settings = CloudHandler.Settings
                    };
                    await LogicHandler.Execute(signin);
                    ResultAuth = signin.Result;

                    Result = ActionConfirm.CreateSuccess(persistUser.Model);

                    var notify = new SimpleNotify
                    {
                        CloudHandler = CloudHandler, DataHandler = DataHandler, CurrentUser = persistUser.Model,
                        LogicHandler = LogicHandler, Model = persistUser.Model,
                        TemplateName = isNew ? "welcomeclient" : "welcomeuser"
                    };
                    await LogicHandler.Execute(notify);
                }
                else
                {
                    Result = ActionConfirm.CreateFailure(persistUser.Confirm.Message);
                }
            }
            else
            {
                Result = ActionConfirm.CreateFailure("Error connecting organisation");
            }
        }
    }
}