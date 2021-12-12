using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EmployeeManager.Authentication;
using EmployeeManager.Model;
using EmployeeManager.DAL;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LuongsController : Controller
    {
        private readonly DBcontext _context;

        public LuongsController(DBcontext context)
        {
            _context = context;
        }

        // GEHT: Luongs
        [HttpGet]
        [Route("getall")]
        public IEnumerable<Luong> GetAll()
        {

            var x = _context.Set<Luong>();
            var data = x.ToList();
            return data;
        }

        // GET: Luongs/Details/5
        [HttpGet]
        [Route("getdetail/{id}")]
        public Luong Details(int? id)
        {
            //if (id == null)
            //{
            //    return NotFound();
            //}

            var luong = _context.Luong
                .FirstOrDefault<Luong>(m => m.maLuong == id);
            //if (luong == null)
            //{
            //    return NotFound();
            //}

            return luong;
        }

        // GET: Luongs/Create
        [HttpPost]
        [Route("postluong")]
        public void Create([FromBody] Luong luong)
        {
            _context.Set<Luong>().Add(luong);
            _context.SaveChanges();
        }

        [HttpPost]
        [Route("updateluong")]
        public void Update([FromBody] Luong luong)
        {
            var obj = _context.Set<Luong>().Where(x => x.maLuong == luong.maLuong).FirstOrDefault();
            obj = luong;
            _context.SaveChanges();
        }
        //[Route("postluong")]
        // POST: Luongs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[Route("postluong")]
        //public async Task<IActionResult> Create([Bind("maLuong,maChamCong,luong,maChucVu,thue")] Luong luong)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(luong);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(luong);
        //}

        //// GET: Luongs/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var luong = await _context.Luong.FindAsync(id);
        //    if (luong == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(luong);
        //}

        //// POST: Luongs/Edit/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("maLuong,maChamCong,luong,maChucVu,thue")] Luong luong)
        //{
        //    if (id != luong.maLuong)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(luong);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!LuongExists(luong.maLuong))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(luong);
        //}

        //// GET: Luongs/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var luong = await _context.Luong
        //        .FirstOrDefaultAsync(m => m.maLuong == id);
        //    if (luong == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(luong);
        //}

        //// POST: Luongs/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var luong = await _context.Luong.FindAsync(id);
        //    _context.Luong.Remove(luong);
        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        //private bool LuongExists(int id)
        //{
        //    return _context.Luong.Any(e => e.maLuong == id);
        //}
    }
}
