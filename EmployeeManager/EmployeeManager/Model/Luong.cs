using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Model
{
    [Table("LUONG")]
    public class Luong
    {
        [Key]
        public int maLuong { get; set;}
        public int maChamCong { get; set; }
        public double luong { get; set; }
        public int maChucVu { get; set; }
        public double thue { get; set; }
    }
}
