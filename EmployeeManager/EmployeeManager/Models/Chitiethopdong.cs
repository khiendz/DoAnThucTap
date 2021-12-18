using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Chitiethopdong
    {
        public Chitiethopdong()
        {
            Hopdong = new HashSet<Hopdong>();
        }

        public string MaChiTietHopDong { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public string Path { get; set; }

        public virtual ICollection<Hopdong> Hopdong { get; set; }
    }
}
