using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace splsys.clases
{
    public class Usuarios
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string email { get; set; }
        public string rol { get; set; }

        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public string token { get; set; }
    }
}
