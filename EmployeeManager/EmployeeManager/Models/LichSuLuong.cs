using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Models
{
    [Table("LichSuLuong")]
    public class LichSuLuong
    {
        [Key]
        public string maLSL { get; set; }
        public string maNV { get; set; }
        public double luong { get; set; }
        public DateTime timePay { get; set; }
        public bool checkPay { get; set; }
        public string description { get; set; }
        public double luongBonus { get; set; }
        public double sum { get; set; }

        public LichSuLuong()
        { }

        public LichSuLuong(string maLSL, string maNV, double luong, DateTime timePay, bool checkPay, string description, double luongBonus, double sum)
        {
            this.maLSL = maLSL;
            this.maNV = maNV;
            this.luong = luong;
            this.timePay = timePay;
            this.checkPay = checkPay;
            this.description = description;
            this.luongBonus = luongBonus;
            this.sum = sum;

        }
    }
}
