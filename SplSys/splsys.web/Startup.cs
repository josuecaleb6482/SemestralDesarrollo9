using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(splsys.web.Startup))]
namespace splsys.web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
