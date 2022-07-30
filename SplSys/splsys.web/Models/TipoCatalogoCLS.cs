using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace splsys.web.Models
{
    public class TipoCatalogoCLS
    {
        public int? draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<Datos> data { get; set; }
        public class Datos
        {
            [Display(Name = "Sec Catálogo")]
            public int IdTipoCatalogoSec { get; set; }
            [Display(Name = "Tipo Catálogo")]
            public string IdTipoCatalogo { get; set; }
            [Display(Name = "Catálogo")]
            public string Catalogo { get; set; }
            [Display(Name = "Nombre Catálogo")]
            public string NombreCatalogo { get; set; }
            [Display(Name = "Usuario Creación")]
            public string UsuarioCrea { get; set; }
            [Display(Name = "Fecha Creación")]
            public DateTime FechaCrea { get; set; }
            [Display(Name = "Usuario Modifica")]
            public string UsuarioModifica { get; set; }
            [Display(Name = "Fecha Creación")]
            public DateTime FechaModifica { get; set; }
        }
    }
}
