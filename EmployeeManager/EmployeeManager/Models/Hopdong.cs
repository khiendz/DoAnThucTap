using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Hopdong
    {
        public string MaHopDong { get; set; }
        public string TenHopDong { get; set; }
        public string MaChiTietHopDong { get; set; }
        public string MaNhanVien { get; set; }

        public virtual Chitiethopdong MaChiTietHopDongNavigation { get; set; }
        public virtual Nhanvien MaNhanVienNavigation { get; set; }
    }
}
