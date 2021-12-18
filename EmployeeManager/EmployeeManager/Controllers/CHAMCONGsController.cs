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
using Microsoft.AspNetCore.Authorization;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CHAMCONGsController : Controller
    {
        private readonly DBcontext _context;

        public CHAMCONGsController(DBcontext context)
        {
            _context = context; 
        }

        [HttpGet]
        [Route("getall")]
        public IEnumerable<CHAMCONG> GetAll()
        {
            IEnumerable<CHAMCONG> listChamCong = _context.ChamCong.ToList();
            return listChamCong;
        }

        [HttpGet]
        [Route("getdetail")]
        public CHAMCONG Details(int? id)
        {
            CHAMCONG chamCong = _context.ChamCong.FirstOrDefault(x => x.maChamCong == id);

            return chamCong;
        }

        [HttpPost]
        [Route("create")]
        public int Create([FromBody] CHAMCONG chamCong)
        {
            CHAMCONG _chamCong = chamCong;
            _chamCong.maChamCong = _context.ChamCong.LastOrDefault().maChamCong++;
            _context.ChamCong.Add(_chamCong);
            _context.SaveChanges();
            return (int)_chamCong.maChamCong;
        }

        [HttpPost]
        [Route("update")]
        public int EditChamCong(CHAMCONG chamCong)
        {
            _context.Set<CHAMCONG>().Remove(_context.ChamCong.FirstOrDefault(x => x.maChamCong == chamCong.maChamCong));
            _context.ChamCong.Add(chamCong);

            _context.SaveChanges();
            return (int)chamCong.maChamCong;
        }

        [HttpPost]
        [Route("update")]
        public int DeleteChamCong(int id)
        {
            _context.Set<CHAMCONG>().Remove(_context.ChamCong.FirstOrDefault(x => x.maChamCong == id));
          

            _context.SaveChanges();
            return id;
        }
        private bool CHAMCONGExists(int id)
        {
            return _context.ChamCong.Any(e => e.maChamCong == id);
        }
    }
}
