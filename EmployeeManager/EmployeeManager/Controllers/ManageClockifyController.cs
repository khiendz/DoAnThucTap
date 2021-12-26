using EmployeeManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageClockifyController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageClockifyController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-department")]
        public IEnumerable<Chamcong> Get()
        {
            var listClockify = _context.Chamcong.ToList();
            return listClockify;
        }


        // GET: api/Employees/5
        [HttpGet("get-detail-department/{id}")]
        public async Task<ActionResult<Chamcong>> GetDepartment(string id)
        {
            var department = _context.Chamcong.Where(em => em.MaNhanVien == id)
                                              .FirstOrDefault();

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(string id, Chamcong department)
        {
            if (id != department.MaChamCong)
            {
                return BadRequest();
            }

            Chamcong obj = _context.Chamcong.Find(id);
            obj.GioBatDau = department.GioBatDau;
            obj.GioKetThuc = department.GioKetThuc;
            obj.TenCongViec = department.TenCongViec;

            //_context.Entry(department).State = EntityState.Modified;
            _context.Chamcong.Update(obj);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Chamcong>> PostDepartment([FromBody] Chamcong department)
        {
            department.MaChamCong = Guid.NewGuid().ToString();
            Chamcong chamCong = new Chamcong();
            chamCong.MaChamCong = department.MaChamCong;
            chamCong.MaLuong = department.MaLuong;
            chamCong.GioBatDau = department.GioBatDau; 
            chamCong.GioKetThuc = department.GioKetThuc;
            chamCong.MaNhanVien = department.MaNhanVien;
            chamCong.TenCongViec = department.TenCongViec;
            chamCong.NgayChamCong = department.NgayChamCong.Date;
            //chamCong.MaNhanVienNavigation = department.MaNhanVienNavigation;
            //chamCong.MaLuongNavigation = department.MaLuongNavigation;
            _context.Chamcong.Add(chamCong);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }

            return CreatedAtAction("GetDepartment", new { id = department.MaChamCong }, department);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Chamcong>> DeleteDepartment(string id)
        {
            var department = await _context.Chamcong.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Chamcong.Remove(department);
            await _context.SaveChangesAsync();

            return department;
        }

        private bool DepartmentExists(string id)
        {
            return _context.Chamcong.Any(e => e.MaChamCong == id);
        }
    }
}
