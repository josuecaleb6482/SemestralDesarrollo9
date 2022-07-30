using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Autofac;
using splsys.web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using NonActionAttribute = System.Web.Mvc.NonActionAttribute;
 
namespace splsys.web.Controllers
{
    public class CatalogoController : Controller
    {
        // GET: Catalogo
        public ActionResult Index()
        {
            return View();
        }
        [NonAction()]
        private void cargarListasTipoCatalogo()
        {            
            List<SelectListItem> lista;
            using (var bd = new SEGUROSEntities())
            {
                lista = (from item1 in bd.TipoCatalogo
                         select new SelectListItem {
                         Text = item1.NombreCatalogo,
                         Value = item1.IdTipoCatalogo}).ToList();

                lista.Insert(0, new SelectListItem { Text = "--Seleccione--", Value = "" });
                ViewBag.tipoCatalogo = lista;
            }
        }

        public ActionResult Edit(int id)

        {
            cargarListasTipoCatalogo();
            CatalogoCLS.Datos oCatalogoCLS = new CatalogoCLS.Datos();

            using (var bd = new SEGUROSEntities())
            {
                Catalogo oCatalogo = bd.Catalogo.Where(p => p.IdCatalogoSec.Equals(id)).First();
                oCatalogoCLS.IdCatalogoSec = oCatalogo.IdCatalogoSec;
                oCatalogoCLS.IdTipoCatalogo = oCatalogo.IdTipoCatalogo;
                oCatalogoCLS.IdCatalogo = oCatalogo.IdCatalogo;
                oCatalogoCLS.Descripcion = oCatalogo.Descripcion;
                oCatalogoCLS.UsuarioCrea = oCatalogo.UsuarioCrea;
                oCatalogoCLS.FechaCrea = (DateTime)oCatalogo.FechaCrea;
            }
            return View(oCatalogoCLS);
        }

        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public ActionResult Edit(CatalogoCLS.Datos oCatalogoCLS)
        {
            int nregistradosEncontrados = 0;
            int IdCatalogoSec = oCatalogoCLS.IdCatalogoSec;

            //using (var bd = new SEGUROSEntities())
            //{
            //    nregistradosEncontrados = bd.Catalogo.Where(p => p.IdCatalogoSec.Equals(IdCatalogoSec)).Count();
            //}
            //if (!ModelState.IsValid || nregistradosEncontrados >= 1)
            //{
            //    if (nregistradosEncontrados >= 1) oCatalogoCLS.mensajeError = "Ya se encuentra registrado el catálogo";
            //    cargarListasTipoCatalogo();
            //    return View(oCatalogoCLS);
            //}
            ApplicationDbContext context = new ApplicationDbContext();
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            using (var bd = new SEGUROSEntities())
            {
                Catalogo oCatalogo = bd.Catalogo.Where(p => p.IdCatalogoSec.Equals(IdCatalogoSec)).First();
                oCatalogo.IdTipoCatalogo = oCatalogoCLS.IdTipoCatalogo;
                oCatalogo.IdCatalogo = oCatalogoCLS.IdCatalogo;
                oCatalogo.Descripcion = oCatalogoCLS.Descripcion;
                oCatalogo.UsuarioModifica = currentUser.UserName;
                oCatalogo.FechaModifica = DateTime.Now;

                bd.SaveChanges();
            }
            return RedirectToAction("Index");
        }
        public List<CatalogoCLS.Datos> obtenerCatalogo(int initialPage, int pageSize, string order, string orderType, string filter, out int totalRecords, out int recordsFiltered)
        {
            using (var bd = new SEGUROSEntities())
            {
                var results = (from p in bd.Catalogo
                               join i in bd.TipoCatalogo
                               on p.IdTipoCatalogo equals i.IdTipoCatalogo
                               select new CatalogoCLS.Datos
                               {
                                   IdCatalogoSec = p.IdCatalogoSec,
                                   IdCatalogo = p.IdCatalogo,
                                   tipocatalogo = i.NombreCatalogo,
                                   Descripcion = p.Descripcion,
                                   enlace = ""
                               }).AsQueryable();

                totalRecords = results.Count();
                if (!String.IsNullOrEmpty(filter))
                {
                    results = results.Where(d => d.IdCatalogo.Contains(filter) || d.tipocatalogo.Contains(filter) ||
                    d.Descripcion.Contains(filter));
                }
                if (orderType == "asc")
                {
                    switch (order)
                    {
                        case "0":
                            results = results.OrderBy(o => o.tipocatalogo);
                            break;
                        case "1":
                            results = results.OrderBy(o => o.Descripcion);
                            break;
                    }

                }
                else if (orderType == "desc")
                {

                    switch (order)
                    {
                        case "0":
                            results = results.OrderByDescending(o => o.tipocatalogo);
                            break;
                        case "1":
                            results = results.OrderByDescending(o => o.Descripcion);
                            break;
                    }
                }
                recordsFiltered = results.Count();
                var results2 = results.Skip(initialPage).Take(pageSize).ToList();

                var lst = new List<CatalogoCLS.Datos>();
                foreach (var l in results2)
                {
                    lst.Add(l);
                }

                return lst.ToList();
            }
        }

        [HttpPost, ValidateHeaderAntiForgeryTokenAttribute]
        public ActionResult ListarCatalogos()
        {
            var tabla = new CatalogoCLS();
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
                    var catalogo = new Catalogo();
                    var results = obtenerCatalogo(
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
    }
 }

