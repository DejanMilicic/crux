using Crux.Model.Utility;
using Rollbar;

namespace Crux.Endpoint.Infrastructure
{
    public static class RollbarConfigure
    {
        public static void ConfigureServices(Keys settings)
        {
            RollbarConfig rollbarConfig = new RollbarConfig(settings.RollbarAccessToken)
            {
                Environment = settings.RollbarEnvironment, CaptureUncaughtExceptions = true,
                LogLevel = ErrorLevel.Warning
            };
            RollbarLocator.RollbarInstance.Configure(rollbarConfig);
        }
    }
}