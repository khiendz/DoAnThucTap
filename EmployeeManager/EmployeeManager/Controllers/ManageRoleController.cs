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
    public class ManageRoleController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageRoleController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-role")]
        public IEnumerable<Chucvu> Get()
        {
            return _context.Chucvu.ToList();
        }


        [HttpGet("get-detail-role/{id}")]
        public async Task<ActionResult<Chucvu>> GetRole(string id)
        {
            var role = _context.Chucvu.Where(em => em.MaChucVu == id)
                                              .FirstOrDefault();

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(string id, Chucvu role)
        {
            if (id != role.MaChucVu)
            {
                return BadRequest();
            }

            _context.Entry(role).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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
        public async Task<ActionResult<Chucvu>> PostRole(Chucvu role)
        {
            role.MaChucVu = Guid.NewGuid().ToString();
            _context.Chucvu.Add(role);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRole", new { id = role.MaChucVu }, role);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Chucvu>> DeleteRole(string id)
        {
            var role = await _context.Chucvu.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }

            _context.Chucvu.Remove(role);
            await _context.SaveChangesAsync();

            return role;
        }

        private bool RoleExists(string id)
        {
            return _context.Chucvu.Any(e => e.MaChucVu == id);
        }
    }
}
