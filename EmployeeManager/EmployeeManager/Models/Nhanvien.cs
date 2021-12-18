using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Nhanvien
    {
        public Nhanvien()
        {
            Chamcong = new HashSet<Chamcong>();
            Hopdong = new HashSet<Hopdong>();
            Taikhoan = new HashSet<Taikhoan>();
        }

        public string MaNhanVien { get; set; }
        public string TenNhanVien { get; set; }
        public DateTime NgaySinh { get; set; }
        public int GioiTinh { get; set; }
        public string SoDienThoai { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string MaChucVu { get; set; }
        public string MaPhongBan { get; set; }

        public virtual Chucvu MaChucVuNavigation { get; set; }
        public virtual Phongban MaPhongBanNavigation { get; set; }
        public virtual ICollection<Chamcong> Chamcong { get; set; }
        public virtual ICollection<Hopdong> Hopdong { get; set; }
        public virtual ICollection<Taikhoan> Taikhoan { get; set; }
    }
}
