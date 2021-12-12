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
    public class CHAMCONGsController : Controller
    {
        private readonly DBcontext _context;

        public CHAMCONGsController(DBcontext context)
        {
            _context = context; 
        }

        // GET: CHAMCONGs
        public async Task<IActionResult> Index()
        {
            return View(await _context.ChamCong.ToListAsync());
        }

        // GET: CHAMCONGs/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cHAMCONG = await _context.ChamCong
                .FirstOrDefaultAsync(m => m.maChamCong == id);
            if (cHAMCONG == null)
            {
                return NotFound();
            }

            return View(cHAMCONG);
        }

        // GET: CHAMCONGs/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CHAMCONGs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("maChamCong,ngayChamCong,tenCongViec,gioBatDau,gioKetThuc,maNhanVien")] CHAMCONG cHAMCONG)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cHAMCONG);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(cHAMCONG);
        }

        // GET: CHAMCONGs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cHAMCONG = await _context.ChamCong.FindAsync(id);
            if (cHAMCONG == null)
            {
                return NotFound();
            }
            return View(cHAMCONG);
        }

        // POST: CHAMCONGs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("maChamCong,ngayChamCong,tenCongViec,gioBatDau,gioKetThuc,maNhanVien")] CHAMCONG cHAMCONG)
        {
            if (id != cHAMCONG.maChamCong)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cHAMCONG);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CHAMCONGExists(cHAMCONG.maChamCong))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(cHAMCONG);
        }

        // GET: CHAMCONGs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var cHAMCONG = await _context.ChamCong
                .FirstOrDefaultAsync(m => m.maChamCong == id);
            if (cHAMCONG == null)
            {
                return NotFound();
            }

            return View(cHAMCONG);
        }

        // POST: CHAMCONGs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var cHAMCONG = await _context.ChamCong.FindAsync(id);
            _context.ChamCong.Remove(cHAMCONG);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CHAMCONGExists(int id)
        {
            return _context.ChamCong.Any(e => e.maChamCong == id);
        }
    }
}
