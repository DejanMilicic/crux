using Crux.Endpoint;
using Crux.Endpoint.Infrastructure;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.ObjectPool;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using Crux.Model.Utility;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Crux.Test.Infrastructure
{
    [TestFixture]
    public class StartupTest
    {
        [Test(Description = "Tests the Web Startup Configure Services")]
        public void StartupConfigureServicesTest()
        {
            //var services = new ServiceCollection();
            //var hosting = new Mock<IWebHostEnvironment>();
            //var objectPool = new Mock<ObjectPoolProvider>();
            //var loggerFactory = new LoggerFactory();
            //var logger = loggerFactory.CreateLogger<Startup>();

            //var config = new Mock<IConfiguration>();
            //var sections = new Mock<IConfigurationSection>();

            //var rollbarMock = new Mock<IConfigurationSection>();
            //rollbarMock.Setup(s => s.Value).Returns("something");

            //sections.Setup(s => s.GetChildren()).Returns(new List<IConfigurationSection> { rollbarMock.Object });
            //config.Setup(c => c.GetSection(It.IsAny<string>())).Returns(sections.Object);

            //var target = new Startup(config.Object, hosting.Object);
            //target.ConfigureServices(services);
            //var options = Options.Create<Keys>(new Keys() { RavenDatabase = "Crux", RavenUrls = new string[] { "http://localhost:8080" }});

            //services.AddSingleton(objectPool.Object);
            //services.AddSingleton(hosting.Object);
            //services.AddSingleton<ILoggerFactory>(loggerFactory);
            //services.AddSingleton<ILogger>(logger);
            //services.AddSingleton<IOptions<Keys>>(options);

            //var provider = services.BuildServiceProvider();
            //target.Configure(new ApplicationBuilder(provider));

            //var store = StoreInjecton.CreateStore(null);
            //var session = StoreInjecton.CreateSession(provider);

            //store.Should().NotBeNull();
            //session.Should().NotBeNull();
        }
    }
}