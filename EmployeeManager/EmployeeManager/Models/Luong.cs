using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Luong
    {
        public Luong()
        {
            Chamcong = new HashSet<Chamcong>();
        }

        public string MaLuong { get; set; }
        public double Luong1 { get; set; }
        public string MaChucVu { get; set; }
        public double Thue { get; set; }

        public virtual Chucvu MaChucVuNavigation { get; set; }
        public virtual ICollection<Chamcong> Chamcong { get; set; }
    }
}
