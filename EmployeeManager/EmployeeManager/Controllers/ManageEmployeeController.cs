using EmployeeManager.Models;
using GenFu;
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
    public class ManageEmployeeController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageEmployeeController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-employee")]
        public IEnumerable<Nhanvien> Get()
        {
            return _context.Nhanvien.ToList();
        }
        //public List<Nhanvien> get()
        //{
        //    return A.ListOf<Nhanvien>();
        //}

        // GET: api/Employees/5
        [HttpGet("get-detail-employee/{id}")]
        public async Task<ActionResult<Nhanvien>> GetEmployee(string id)
        {
            var employee = _context.Nhanvien.Where(em => em.MaNhanVien == id)
                                              .FirstOrDefault();

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(string id, Nhanvien employee)
        {
            if (id != employee.MaNhanVien)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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
        public async Task<ActionResult<Nhanvien>> PostEmployee(Nhanvien employee)
        {
            employee.MaNhanVien = Guid.NewGuid().ToString();
            _context.Nhanvien.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.MaNhanVien }, employee);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Nhanvien>> DeleteEmployee(string id)
        {
            var employee = await _context.Nhanvien.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Nhanvien.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        private bool EmployeeExists(string id)
        {
            return _context.Nhanvien.Any(e => e.MaNhanVien == id);
        }
    }
}
