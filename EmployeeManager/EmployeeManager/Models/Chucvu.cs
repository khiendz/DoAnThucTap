using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Chucvu
    {
        public Chucvu()
        {
            Luong = new HashSet<Luong>();
            Nhanvien = new HashSet<Nhanvien>();
        }

        public string MaChucVu { get; set; }
        public string TenChucVu { get; set; }
        public string MoTa { get; set; }
        public double HeSoLuong { get; set; }

        public virtual ICollection<Luong> Luong { get; set; }
        public virtual ICollection<Nhanvien> Nhanvien { get; set; }
    }
}
