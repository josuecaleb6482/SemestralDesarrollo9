using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace splsys.web.Controllers
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class ValidateHeaderAntiForgeryTokenAttribute : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            var request = filterContext.HttpContext.Request;
  
            if (request.HttpMethod == WebRequestMethods.Http.Post && request.Form["__RequestVerificationToken"] != null && request.Form["__RequestVerificationToken"] != "undefined")
            {
                AntiForgery.Validate(CookieToken(request), request.Form["__RequestVerificationToken"]);
            }
            else
            {
                this.HandleUnauthorizedRequest(filterContext);
            }
        }


        private void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {


            filterContext.Result = new JsonResult()
            {
                // denied-result
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                Data = new { StatusCode = System.Net.HttpStatusCode.InternalServerError, Error = "Access Denied" }
            };

            throw new HttpAntiForgeryException("No tiene Acceso al Contenido");
        }

        private string CookieToken(HttpRequestBase request)
        {
            var cookie = request.Cookies[AntiForgeryConfig.CookieName];
            return cookie != null ? cookie.Value : null;
        }
    }
}