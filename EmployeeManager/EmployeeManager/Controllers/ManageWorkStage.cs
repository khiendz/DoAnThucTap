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
    public class ManageWorkStage : ControllerBase
    {

        private readonly QUANLYNHANVIENContext _context;

        public ManageWorkStage(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("get-stage")]
        public IEnumerable<Quatrinhlamviec> Get()
        {
            return _context.Quatrinhlamviec.ToList();
        }
        //public List<Nhanvien> get()
        //{
        //    return A.ListOf<Nhanvien>();
        //}

        // GET: api/Employees/5
        [HttpGet("get-detail-stage/{id}")]
        public async Task<ActionResult<Quatrinhlamviec>> GetStage(string id)
        {
            var employee = _context.Quatrinhlamviec.Where(em => em.MaQuaTrinhLamViec == id)
                                              .FirstOrDefault();

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStage(string id, Quatrinhlamviec stage)
        {
            if (id != stage.MaQuaTrinhLamViec)
            {
                return BadRequest();
            }

            _context.Entry(stage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StageExists(id))
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
        public async Task<ActionResult<Quatrinhlamviec>> PostStage(Quatrinhlamviec stage)
        {
            stage.MaQuaTrinhLamViec = Guid.NewGuid().ToString();
            _context.Quatrinhlamviec.Add(stage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStage", new { id = stage.MaQuaTrinhLamViec }, stage);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Quatrinhlamviec>> DeleteStage(string id)
        {
            var stage = await _context.Quatrinhlamviec.FindAsync(id);
            if (stage == null)
            {
                return NotFound();
            }

            _context.Quatrinhlamviec.Remove(stage);
            await _context.SaveChangesAsync();

            return stage;
        }

        private bool StageExists(string id)
        {
            return _context.Quatrinhlamviec.Any(e => e.MaQuaTrinhLamViec == id);
        }
    }
}
