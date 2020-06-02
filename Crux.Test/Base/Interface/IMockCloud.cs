using Crux.Cloud.Core.Interface;

namespace Crux.Test.Base.Interface
{
    public interface IMockCloud
    {
        object Execute(ICloudCmd command);
    }
}