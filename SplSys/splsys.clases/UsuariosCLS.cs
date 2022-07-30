using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace splsys.clases
{
    public class UsuariosCLS
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
            [Display(Name = "Email")]
            [StringLength(255, ErrorMessage = "Longitud Maxima 255")]
            public string email { get; set; }
            [Required]
            [Display(Name = "Nombre")]
            [StringLength(255, ErrorMessage = "Longitud Maxima 255")]
            public string nombre { get; set; }
            [Required]
            [Display(Name = "Apellido")]
            [StringLength(255, ErrorMessage = "Longitud Maxima 255")]
            public string apellido { get; set; }
            [Required]
            [Display(Name = "Password")]
            [StringLength(255, ErrorMessage = "Longitud Maxima 255")]
            public string hash { get; set; }
            [Required]
            [Display(Name = "Rol")]           
            [StringLength(1, ErrorMessage = "Longitud Maxima 1")]
            public string rol { get; set; }
            [Required]
           
            [Display(Name = "Fecha Creación")]            
            [DataType(DataType.Date)]
            [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
            public DateTime createdAt { get; set; }
            [Display(Name = "Fecha Nodificación")]
            [DataType(DataType.Date)]
            [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
            public DateTime udpateddAt { get; set; }
            
            public string enlace { get; set; }
            public string mensajeError { get; set; }
        }
    }
}
