using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Phongban
    {
        public Phongban()
        {
            Nhanvien = new HashSet<Nhanvien>();
        }

        public string MaPhongBan { get; set; }
        public string TenPhongBan { get; set; }
        public string MoTa { get; set; }

        public virtual ICollection<Nhanvien> Nhanvien { get; set; }
    }
}
