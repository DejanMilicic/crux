using System;
using System.Text;
using Crux.Endpoint.Infrastructure;
using Crux.Model.Utility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Rollbar.NetCore.AspNet;

namespace Crux.Endpoint
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IHostEnvironment Hosting { get; }

        public Startup(IConfiguration configuration, IHostEnvironment hosting)
        {
            Configuration = configuration;
            Hosting = hosting;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<Keys>(Configuration.GetSection("Keys"));
            var settings = new Keys();
            Configuration.GetSection("Keys").Bind(settings);

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = "Jwt";
                    options.DefaultChallengeScheme = "Jwt";
                })
                .AddJwtBearer("Jwt", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.JwtKey)),
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(60)
                    };
                });

            RollbarConfigure.ConfigureServices(settings);
            services.AddRollbarLogger(loggerOptions =>
            {
                loggerOptions.Filter = (loggerName, loglevel) => loglevel >= LogLevel.Trace;
            });
            services.AddCors();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<AuthFilter>();
            services.AddControllers();
            ServiceInjection.ConfigureServices(services);

            if (!Hosting.IsDevelopment())
            {
                services.AddHttpsRedirection(options => { options.HttpsPort = 443; });
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseRollbarMiddleware();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            if (Hosting.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "file",
                    pattern: "api/upload",
                    defaults: new {controller = "Loader", action = "Upload"});

                endpoints.MapControllerRoute(
                    name: "key",
                    pattern: "api/{controller}/{action}/{key}/{value}");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action}/{id?}");
            });
        }
    }
}