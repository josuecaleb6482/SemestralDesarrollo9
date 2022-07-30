using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace splsys.web.Models
{
    public class CatalogoCLS
    {
        public int? draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<Datos> data { get; set; }
        public class Datos
        {
            [Display(Name = "Sec Catálogo")]
        public int IdCatalogoSec { get; set; }
        [Required]
        [Display(Name = "Id Catálogo")]
        [StringLength(100, ErrorMessage = "Longitud Maxima 100")]
        public string IdCatalogo { get; set; }
        [Required]
        [Display(Name = "Tipo Catálogo")]
        [StringLength(50, ErrorMessage = "Longitud Maxima 50")]
        public string IdTipoCatalogo { get; set; }
        [Required]
        [Display(Name = "Descripción")]
        [StringLength(200, ErrorMessage = "Longitud Maxima 200")]
        public string Descripcion { get; set; }
        [Required]
        [Display(Name = "Usuario Creación")]
        [StringLength(50, ErrorMessage = "Longitud Maxima 50")]
        public string UsuarioCrea { get; set; }
        [Display(Name = "Fecha Creación")]
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FechaCrea { get; set; }
        [Required]
        [Display(Name = "Usuario Modificación")]
        [StringLength(50, ErrorMessage = "Longitud Maxima 50")]
        public string UsuarioModifica { get; set; }
        [Display(Name = "Fecha Modificación")]
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FechaModifica { get; set; }
        public string tipocatalogo { get; set; }
        public string enlace { get; set; }
        public string mensajeError { get; set; }
    }
    }
}
