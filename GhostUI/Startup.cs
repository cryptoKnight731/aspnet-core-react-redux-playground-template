using GhostUI.Hubs;
using GhostUI.Extensions;
using System.IO.Compression;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using GhostUI.Middleware.ExceptionHandler;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;

namespace GhostUI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Custom healthcheck example (using nuget package .AddHealthChecksUI() to view results at {url}/healthchecks-ui)
            services.AddHealthChecksUI()
                .AddHealthChecks()
                .AddGCInfoCheck("GCInfo");

            // Add CORS, Gzip response compression (prod only), MVC, SignalR
            var gzipMimeTypes = Configuration.GetSection("Compression:Gzip:MimeTypes").Get<string[]>();
            services.AddCorsConfig("AllowAll")
                .AddResponseCompression_Gzip(gzipMimeTypes, CompressionLevel.Fastest)
                .AddMvcConfig(CompatibilityVersion.Version_2_2)
                .AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // Enable all custom health checks registered earlier (browse to {url}/healthchecks-ui to UI / {url}/healthchecks-json to raw JSON)
            app.UseApiHealthChecks("/healthchecks-json")
               .UseHealthChecksUI();

            // If development, enable Hot Module Replacement
            // If production, enable Gzip response compression & strict transport security headers
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage()
                   .UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                   {
                       HotModuleReplacement = true,
                       ReactHotModuleReplacement = true
                   });
            }
            else
            {
                app.UseResponseCompression();
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseCors("AllowAll")
               .UseStaticFiles()
               .UseSignalR((options) => options.MapHub<UsersHub>("/hubs/users"))
               .UseMiddleware<ExceptionMiddleware>()
               .UseMvc(routes =>
               {
                   routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}")
                         .MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
               });
        }
    }
}
