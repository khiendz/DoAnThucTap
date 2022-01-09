using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Models
{
    public class ChamCongRequest
    {
        public string? MaChamCong { get; set; }
        public DateTime NgayChamCong { get; set; }
        public string TenCongViec { get; set; }
        public DateTime GioBatDau { get; set; }
        public DateTime GioKetThuc { get; set; }
        public string MaNhanVien { get; set; }
        public string MaLuong { get; set; }
    }
}
