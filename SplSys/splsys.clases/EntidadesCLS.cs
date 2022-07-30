using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace splsys.clases
{
    public class EntidadesCLS
    {
        public int? draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<Datos> data { get; set; }
        public class Datos
        {
            [Display(Name = "Id")]
            public int id { get; set; }
            [Required]
            [Display(Name = "Nombre")]
            [StringLength(100, ErrorMessage = "Longitud Maxima 100")]
            public string nombre { get; set; }
            [Required]
            [Display(Name = "RUC")]
            [StringLength(50, ErrorMessage = "Longitud Maxima 50")]
            public string ruc { get; set; }
            [Required]
            [Display(Name = "Apellido")]
            [StringLength(255, ErrorMessage = "Longitud Maxima 255")]
            public string apellido { get; set; }
            [Required]
            [Display(Name = "DV")]
            [StringLength(10, ErrorMessage = "Longitud Maxima 10")]
            public string dv { get; set; }
            [Required]
            [Display(Name = "Logo")]
            [StringLength(250, ErrorMessage = "Longitud Maxima 250")]
            public string logo { get; set; }
            [Required]
            [Display(Name = "Dirección")]
            [StringLength(250, ErrorMessage = "Longitud Maxima 250")]
            public string direccion { get; set; }
            [Required]
            [Display(Name = "Teléfono")]
            [StringLength(20, ErrorMessage = "Longitud Maxima 20")]
            public string telefono { get; set; }
            [Required]
            [Display(Name = "Email")]
            [StringLength(100, ErrorMessage = "Longitud Maxima 100")]
            public string email { get; set; }
            [Required]
            [Display(Name = "estado")]
            [StringLength(1, ErrorMessage = "Longitud Maxima 1")]
            public string estado { get; set; }
            [Required]
            [Display(Name = "Usuario Crea")]         
            public string usuarioCrea { get; set; }
            [Required]
            [Display(Name = "Usuario Modifica")]
            public string usuarioModifica { get; set; }
            [Display(Name = "Fecha Creación")]
            [DataType(DataType.Date)]
            [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
            public DateTime createdAt { get; set; }
            [Display(Name = "Fecha Nodificación")]
            [DataType(DataType.Date)]
            [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
            public DateTime udpatedAt { get; set; }

            public string enlace { get; set; }
            public string mensajeError { get; set; }
        }
    }
}
