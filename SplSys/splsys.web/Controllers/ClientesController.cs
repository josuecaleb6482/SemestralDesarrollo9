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
    public class ClientesController : Controller
    {
        // GET: Clientes
        public ActionResult Index()
        {
            return View();
        }
        public List<ClientesCLS.Datos> obtenerClientes(int initialPage, int pageSize, string order, string orderType, string filter, out int totalRecords, out int recordsFiltered)
        {

            string token;
            token = Session["token"].ToString();
            totalRecords = 0;
            recordsFiltered = 0;
            var lst = new List<ClientesCLS.Datos>();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            /*clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);*/

            var response = clienteHttp.GetAsync("api/clientes").Result;
            if (response.IsSuccessStatusCode)
            {
                var resultString = response.Content.ReadAsStringAsync().Result;

                List<ClientesCLS.Datos> listaClientes = JsonConvert.DeserializeObject<List<ClientesCLS.Datos>>(resultString);
                totalRecords = listaClientes.Count();
                if (!String.IsNullOrEmpty(filter))
                {

                    listaClientes = (List<ClientesCLS.Datos>)listaClientes.Where(d => d.email.Contains(filter));
                }
                if (orderType == "asc")
                {
                    switch (order)
                    {
                        case "0":
                            //listaEntidadesCLS = (List<UsuariosCLS.Datos>)listaUsuarios.OrderBy(o => o.id);
                            break;
                        case "1":
                            //listaEntidadesCLS = (List<UsuariosCLS.Datos>)listaUsuarios.OrderBy(o => o.email);
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
                recordsFiltered = listaClientes.Count();
                var results2 = listaClientes.Skip(initialPage).Take(pageSize).ToList();

                foreach (var l in results2)
                {
                    lst.Add(l);
                }

                return lst.ToList();
            }
            return lst.ToList();

        }
        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public ActionResult ListarClientes()
        {
            var tabla = new ClientesCLS();
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
                var entidad = new ClientesCLS.Datos();
                var results = obtenerClientes(
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
            ClientesCLS.Datos oClientesCLS = new ClientesCLS.Datos();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
          /*  clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);
          */

            var response = clienteHttp.GetAsync(string.Format("{0}{1}", "api/clientes/", id)).Result;

            if (response.IsSuccessStatusCode)
            {


                var resultString = response.Content.ReadAsStringAsync().Result;
                oClientesCLS = JsonConvert.DeserializeObject<ClientesCLS.Datos>(resultString);

            }

            return View(oClientesCLS);
        }
        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public async Task<ActionResult> Edit(ClientesCLS.Datos oClientesCLS)
        {

            int idUser = oClientesCLS.id;

            HttpContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("cedula", oClientesCLS.cedula),
                new KeyValuePair<string, string>("nombre", oClientesCLS.nombre),
                new KeyValuePair<string, string>("nombre2", oClientesCLS.nombre2),
                new KeyValuePair<string, string>("apellido", oClientesCLS.apellido),
                new KeyValuePair<string, string>("apellido2", oClientesCLS.apellido2),
                new KeyValuePair<string, string>("email", oClientesCLS.email)
            });
            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");


            string token = Session["token"].ToString();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            /*clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);*/


            string uri = string.Format("{0}{1}", "api/clientes/", idUser);
            var response = clienteHttp.PutAsync(uri, content).Result;
            if (response.Content != null)
            {
                var responseContent = await response.Content.ReadAsStringAsync();


            }


            return RedirectToAction("Index");
        }
    }
}
