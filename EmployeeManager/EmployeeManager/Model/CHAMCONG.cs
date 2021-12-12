using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Model
{
    [Table("CHAMCONG")]
    public class CHAMCONG
    {
        [Key]
        public int maChamCong { get; set; }
        public DateTime ngayChamCong { get; set; }
        public string tenCongViec { get; set; }
        public DateTime gioBatDau { get; set; }
        public DateTime gioKetThuc { get; set; }
        public int maNhanVien { get; set; }
             
    }
}
