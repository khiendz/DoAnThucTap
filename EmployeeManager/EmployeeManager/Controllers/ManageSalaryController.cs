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
    [Authorize]
    public class ManageSalaryController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageSalaryController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-department")]
        public IEnumerable<Luong> Get()
        {
            return _context.Luong.ToList();
        }


        // GET: api/Employees/5
        [HttpGet("get-detail-department/{id}")]
        public async Task<ActionResult<Luong>> GetDepartment(string id)
        {
            var responseLuong = _context.Luong.Where(em => em.MaLuong == id)
                                              .FirstOrDefault();

            if (responseLuong == null)
            {
                return NotFound();
            }

            return responseLuong;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(string id, Luong department)
        {
            if (id != department.MaLuong)
            {
                return BadRequest();
            }

            _context.Entry(department).State = EntityState.Modified;

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
        public async Task<ActionResult<Luong>> PostDepartment(Luong department)
        {
            department.MaLuong = Guid.NewGuid().ToString();
            _context.Luong.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.MaLuong }, department);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Luong>> DeleteDepartment(string id)
        {
            var department = await _context.Luong.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Luong.Remove(department);
            await _context.SaveChangesAsync();

            return department;
        }

        private bool DepartmentExists(string id)
        {
            return _context.Luong.Any(e => e.MaLuong == id);
        }
    }
}
