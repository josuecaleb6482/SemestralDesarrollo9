using splsys.web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using System.Net.Http;
using RestSharp;
using Newtonsoft.Json;
using splsys.clases;
namespace splsys.web.Controllers
{
    [Authorize]
    public class LoginController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private readonly IConfiguration _configuration;

        public LoginController()
        {
        }

        public LoginController(ApplicationUserManager userManager, ApplicationSignInManager signInManager, IConfiguration configuration)
        {
            UserManager = userManager;
            SignInManager = signInManager;
            this._configuration = configuration;
        }
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        [AllowAnonymous]
        public ActionResult Index(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;

            LoginViewModel model = new LoginViewModel();
            return View(model);
        }
        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginViewModel model, string returnUrl)
        {
             

            if (!ModelState.IsValid)
            {
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors).ToList())
                {
                    ModelState.AddModelError("", error.ErrorMessage);
                }
                return View("Login", model);
            }

            


            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            var data = new { email = model.Email, password = model.Password };
            var json = JsonConvert.SerializeObject(data);

            var response = await clienteHttp.PostAsync("api/usuarios/authenticate",
            new StringContent(json, Encoding.UTF8, "application/json"));


            //Validar Autorizacion
            if (response.IsSuccessStatusCode)
            {
                string resultString = response.Content.ReadAsStringAsync().Result;
                Usuarios usuario = new Usuarios();
                usuario = JsonConvert.DeserializeObject<Usuarios>(resultString);
                var token = usuario.token;
                Session["email"] = usuario.email;
                Session["nombre"] = usuario.email;
                Session["apellido"] = usuario.email;
                Session["token"] = usuario.token;
                return RedirectToLocal(returnUrl);

            }else
			{
                ModelState.AddModelError("", "Intento de inicio de sesión no válido.");
                return View(model);
            }

             
        }
        #region Aplicaciones auxiliares
        // Se usa para la protección XSRF al agregar inicios de sesión externos
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Usuarios");
        }
        [HttpGet]
        public ActionResult LogOff()
        {

            Session.Abandon();
            Session.Clear();
            Session.RemoveAll();

            //var ctx = Request.GetOwinContext();
            //var authenticationManager = ctx.Authentication;
            //authenticationManager.SignOut();
            return this.RedirectToAction("Index", "Login", false);
        }

        #endregion

    }
}
