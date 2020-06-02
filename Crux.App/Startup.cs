using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Crux.App
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "web/build"; });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "web";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
    }
}
