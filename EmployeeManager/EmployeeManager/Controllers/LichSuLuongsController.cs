using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManager.Models;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichSuLuongsController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public LichSuLuongsController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }

        // GET: api/LichSuLuongs
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<LichSuLuong>>> GetLichSuLuong()
        {
            return await _context.LichSuLuong.ToListAsync();
        }

        // GET: api/LichSuLuongs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LichSuLuong>> GetLichSuLuong(string id)
        {
            var lichSuLuong = await _context.LichSuLuong.FindAsync(id);

            if (lichSuLuong == null)
            {
                return NotFound();
            }

            return lichSuLuong;
        }

        // PUT: api/LichSuLuongs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutLichSuLuong(string id, LichSuLuong lichSuLuong)
        {
            if (id != lichSuLuong.maLSL)
            {
                return BadRequest();
            }

            _context.Entry(lichSuLuong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LichSuLuongExists(id))
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

        // POST: api/LichSuLuongs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("create")]
        public async Task<ActionResult<LichSuLuong>> PostLichSuLuong(LichSuLuong lichSuLuong)
        {
            lichSuLuong.maLSL = Guid.NewGuid().ToString();
            _context.LichSuLuong.Add(lichSuLuong);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LichSuLuongExists(lichSuLuong.maLSL))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLichSuLuong", new { id = lichSuLuong.maLSL }, lichSuLuong);
        }

        // DELETE: api/LichSuLuongs/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteLichSuLuong(string id)
        {
            var lichSuLuong = await _context.LichSuLuong.FindAsync(id);
            if (lichSuLuong == null)
            {
                return NotFound();
            }

            _context.LichSuLuong.Remove(lichSuLuong);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LichSuLuongExists(string id)
        {
            return _context.LichSuLuong.Any(e => e.maLSL == id);
        }
    }
}
