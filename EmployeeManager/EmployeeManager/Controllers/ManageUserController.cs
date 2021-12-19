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
    public class ManageUserController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageUserController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-department")]
        public IEnumerable<Taikhoan> Get()
        {
            return _context.Taikhoan.ToList();
        }

        // GET: api/Employees/5
        [HttpGet("get-detail-department/{id}")]
        public Taikhoan GetDepartment(string id)
        {
            var department = _context.Taikhoan.Where(em => em.UserName == id)
                                              .FirstOrDefault();
            return department;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(string id, Chamcong department)
        {
            if (id != department.MaChamCong)
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
        public async Task<ActionResult<Chamcong>> PostDepartment(Chamcong department)
        {
            department.MaChamCong = Guid.NewGuid().ToString();
            _context.Chamcong.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.MaChamCong }, department);
        }

        [HttpDelete("{id}")]
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
