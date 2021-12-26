using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Quatrinhlamviec
    {
        public string MaQuaTrinhLamViec { get; set; }
        public string MaNhanVien { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime ThoiGianKetThuc { get; set; }
        public string MaChucVu { get; set; }
        public string MaPhongBan { get; set; }
        public string MoTaCongViec { get; set; }

        public virtual Chucvu MaChucVuNavigation { get; set; }
        public virtual Nhanvien MaNhanVienNavigation { get; set; }
        public virtual Phongban MaPhongBanNavigation { get; set; }
    }
}
