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
    public class EntidadesController : Controller
    {
        // GET: Entidades
        public ActionResult Index()
        {
            return View();
        }
        public List<EntidadesCLS.Datos> obtenerEntidades(int initialPage, int pageSize, string order, string orderType, string filter, out int totalRecords, out int recordsFiltered)
        {

            string token;
            token = Session["token"].ToString();
            totalRecords = 0;
            recordsFiltered = 0;
            var lst = new List<EntidadesCLS.Datos>();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);

            var response = clienteHttp.GetAsync("api/entidades").Result;
            if (response.IsSuccessStatusCode)
            {
                var resultString = response.Content.ReadAsStringAsync().Result;

                List<EntidadesCLS.Datos> listaEntidades = JsonConvert.DeserializeObject<List<EntidadesCLS.Datos>>(resultString);
                totalRecords = listaEntidades.Count();
                if (!String.IsNullOrEmpty(filter))
                {

                    listaEntidades = (List<EntidadesCLS.Datos>)listaEntidades.Where(d => d.email.Contains(filter));
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
                recordsFiltered = listaEntidades.Count();
                var results2 = listaEntidades.Skip(initialPage).Take(pageSize).ToList();

                foreach (var l in results2)
                {
                    lst.Add(l);
                }

                return lst.ToList();
            }
            return lst.ToList();

        }
        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public ActionResult ListarEntidades()
        {
            var tabla = new EntidadesCLS();
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
                var entidad = new EntidadesCLS.Datos();
                var results = obtenerEntidades(
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
            EntidadesCLS.Datos oEntidadesCLS = new EntidadesCLS.Datos();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);


            var response = clienteHttp.GetAsync(string.Format("{0}{1}", "api/entidades/", id)).Result;

            if (response.IsSuccessStatusCode)
            {


                var resultString = response.Content.ReadAsStringAsync().Result;
                oEntidadesCLS = JsonConvert.DeserializeObject<EntidadesCLS.Datos>(resultString);

            }

            return View(oEntidadesCLS);
        }
        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public async Task<ActionResult> Edit(EntidadesCLS.Datos oEntidadesCLS)
        {

            int idUser = oEntidadesCLS.id;

            HttpContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("nombre", oEntidadesCLS.nombre),
                new KeyValuePair<string, string>("ruc", oEntidadesCLS.ruc),
                new KeyValuePair<string, string>("dv", oEntidadesCLS.dv),
                new KeyValuePair<string, string>("direccion", oEntidadesCLS.direccion),
                new KeyValuePair<string, string>("telefono", oEntidadesCLS.telefono),
                new KeyValuePair<string, string>("email", oEntidadesCLS.email),
                new KeyValuePair<string, string>("usuarioModifica", oEntidadesCLS.usuarioModifica)

            });
            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");


            string token = Session["token"].ToString();
            HttpClient clienteHttp = new HttpClient();
            clienteHttp.BaseAddress = new Uri(ConfigurationManager.AppSettings["APIAdress"].ToString());
            clienteHttp.DefaultRequestHeaders.Authorization
                      = new AuthenticationHeaderValue("Bearer", token);


            string uri = string.Format("{0}{1}", "api/entidades/", idUser);
            var response = clienteHttp.PutAsync(uri, content).Result;
            if (response.Content != null)
            {
                var responseContent = await response.Content.ReadAsStringAsync();


            }


            return RedirectToAction("Index");
        }
    }
}
