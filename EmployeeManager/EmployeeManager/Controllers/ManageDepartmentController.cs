using EmployeeManager.Models;
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
    public class ManageDepartmentController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageDepartmentController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-department")]
        public IEnumerable<Phongban> Get()
        {
            return _context.Phongban.ToList();
        }


        // GET: api/Employees/5
        [HttpGet("get-detail-department/{id}")]
        public async Task<ActionResult<Phongban>> GetDepartment(string id)
        {
            var department = _context.Phongban.Where(em => em.MaPhongBan == id)
                                              .FirstOrDefault();

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(string id, Phongban department)
        {
            if (id != department.MaPhongBan)
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
        public async Task<ActionResult<Phongban>> PostDepartment(Phongban department)
        {
            department.MaPhongBan = Guid.NewGuid().ToString();
            _context.Phongban.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.MaPhongBan }, department);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Phongban>> DeleteDepartment(string id)
        {
            var department = await _context.Phongban.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Phongban.Remove(department);
            await _context.SaveChangesAsync();

            return department;
        }

        private bool DepartmentExists(string id)
        {
            return _context.Phongban.Any(e => e.MaPhongBan == id);
        }
    }
}
