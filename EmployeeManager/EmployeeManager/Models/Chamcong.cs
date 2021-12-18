﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace EmployeeManager.Models
{
    public partial class Chamcong
    {
        public string MaChamCong { get; set; }
        public DateTime NgayChamCong { get; set; }
        public string TenCongViec { get; set; }
        public DateTime GioBatDau { get; set; }
        public DateTime GioKetThuc { get; set; }
        public string MaNhanVien { get; set; }
        public string MaLuong { get; set; }

        public virtual Luong MaLuongNavigation { get; set; }
        public virtual Nhanvien MaNhanVienNavigation { get; set; }
    }
}
