using Newtonsoft.Json;
using splsys.clases;
using splsys.web.Controllers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace splsys.web.Controllers
{
    public class UsuariosController : Controller
    {
        // GET: Usuarios
        public ActionResult Index()
        {
            return View();
        }
        public List<UsuariosCLS.Datos> obtenerUsuarios(int initialPage, int pageSize, string order, string orderType, string filter, out int totalRecords, out int recordsFiltered)
        {
            
                string token;
                token = Session["token"].ToString();
                totalRecords = 0;
                recordsFiltered = 0;
                var lst = new List<UsuariosCLS.Datos>();
                HttpClient clienteHttp = new HttpClient();
                clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
                clienteHttp.DefaultRequestHeaders.Authorization
                          = new AuthenticationHeaderValue("Bearer", token);

                var response =  clienteHttp.GetAsync("api/usuarios").Result;
                if (response.IsSuccessStatusCode)
				{
                    var resultString = response.Content.ReadAsStringAsync().Result;

                

                List<UsuariosCLS.Datos> listaUsuarios = JsonConvert.DeserializeObject<List<UsuariosCLS.Datos>>(resultString);
                    totalRecords = listaUsuarios.Count();
                if (!String.IsNullOrEmpty(filter))
                {

                    listaUsuarios = (List<UsuariosCLS.Datos>)listaUsuarios.Where(d => d.email.Contains(filter));
                }
                        if (orderType == "asc")
                        {
                            switch (order)
                            {
                                case "0":
                                    //listaUsuarios = (List<UsuariosCLS.Datos>)listaUsuarios.OrderBy(o => o.id);
                                    break;
                                case "1":
                                    //listaUsuarios = (List<UsuariosCLS.Datos>)listaUsuarios.OrderBy(o => o.email);
                                    break;
                            }

                        }
                        else if (orderType == "desc")
                        {

                            switch (order)
                            {
                                case "0":
                                    //listaUsuarios =  listaUsuarios.OrderByDescending(o => o.id);
                                   // listaUsuarios = (List<UsuariosCLS.Datos>)listaUsuarios.OrderByDescending(o => o.id) ;
                                    break;
                                case "1":
                                   // listaUsuarios = (List<UsuariosCLS.Datos>)listaUsuarios.OrderByDescending(o => o.email) ;
                                    break;
                            }
                        }
                        recordsFiltered = listaUsuarios.Count();
                        var results2 = listaUsuarios.Skip(initialPage).Take(pageSize).ToList();
                       
                        foreach (var l in results2)
                        {
                            lst.Add(l);
                        }

                        return lst.ToList();
                    }
            return lst.ToList();

        }
        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public ActionResult ListarUsuarios()
        {
            var tabla = new UsuariosCLS();
            var totalRecords = 0;
            var recordsFiltered = 0;
            int draw = Convert.ToInt32(Request.Form["draw"]);
            int start = Convert.ToInt32(Request.Form["start"]);
            int length = Convert.ToInt32(Request.Form["length"]);
            string search = Request.Form["search[value]"];
            string order = Request.Form["order[0][column]"];
            string orderType = Request.Form["order[0][dir]"];
            try
            {
                //var builder = new ContainerBuilder();
                //builder.RegisterType<FabricaServicios>().As<IFabricaServicios>();
                //var container = builder.Build();

                //using (var scope = container.BeginLifetimeScope())
                //{
                //    var _fabricaServicios = scope.Resolve<IFabricaServicios>();
                var usuario = new Usuarios();
                var results = obtenerUsuarios(
                     start,
                     length,
                     order,
                     orderType,
                     search,
                     out totalRecords,
                     out recordsFiltered
                    );
                tabla.draw = draw;
                tabla.recordsFiltered = recordsFiltered;
                tabla.recordsTotal = totalRecords;
                tabla.data = results;

            }
            catch (Exception)
            {
                return Json(tabla, JsonRequestBehavior.AllowGet);
            }

            return Json(tabla, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Edit(int id)
        {
            string token = Session["token"].ToString();
            UsuariosCLS.Datos oUsuariosCLS = new UsuariosCLS.Datos();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);

             
            var response = clienteHttp.GetAsync(string.Format("{0}{1}", "api/usuarios/", id)).Result;
            
            if (response.IsSuccessStatusCode)
            {
                 

                var resultString = response.Content.ReadAsStringAsync().Result;
                oUsuariosCLS = JsonConvert.DeserializeObject<UsuariosCLS.Datos>(resultString);
                 
            }
                       
                return View(oUsuariosCLS);
        }
        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public async Task<ActionResult> Edit(UsuariosCLS.Datos oUsuariosCLS)
        {
             
            int idUser = oUsuariosCLS.id;

            HttpContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("nombre", oUsuariosCLS.nombre),
                new KeyValuePair<string, string>("apellido", oUsuariosCLS.apellido)
            });
            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            
            string token = Session["token"].ToString();        
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);
            
           
            string uri = string.Format("{0}{1}", "api/usuarios/", idUser);
            var response =   clienteHttp.PutAsync(uri, content).Result;
            if (response.Content != null)
            {
                var responseContent = await response.Content.ReadAsStringAsync();

                
            }


            return RedirectToAction("Index");
        }
        public ActionResult Create(UsuariosCLS.Datos model, string valorRetorno)
        { 
            return View(model);
        }

        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public async Task<ActionResult> Create(UsuariosCLS.Datos model)
        {
           
             HttpContent content = new FormUrlEncodedContent(new[]
           {
             new KeyValuePair<string, string>("nombre", model.nombre),
             new KeyValuePair<string, string>("apellido", model.apellido),
             new KeyValuePair<string, string>("email", model.email),
             new KeyValuePair<string, string>("password", model.hash),
             new KeyValuePair<string, string>("rol", "U")                 
         });
         content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
           
            string token = Session["token"].ToString();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);
            string uri =  "api/usuarios/register/";
            var response = clienteHttp.PostAsync(uri, content).Result;
          
            if (response.Content != null)
            {
                var responseContent = await response.Content.ReadAsStringAsync();


            }
            return RedirectToAction("Index");
        }
    }
}
