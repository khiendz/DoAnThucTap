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
    public class LuongsController : Controller
    {
        private readonly DBcontext _context;

        public LuongsController(DBcontext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getall")]
        public IEnumerable<Luong> GetAll()
        {

            var x = _context.Set<Luong>();
            var data = x.ToList();
            return data;
        }

        [HttpGet]
        [Route("getdetail/{id}")]
        public Luong Details(int? id)
        {
            var luong = _context.Luong
                .FirstOrDefault<Luong>(m => m.maLuong == id);

            return luong;
        }

        [HttpPost]
        [Route("create")]
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

        [HttpPost]
        [Route("deleteluong")]
        public int Delete([FromBody] int id)
        {
            _context.Set<Luong>().Remove(_context.Luong.FirstOrDefault(x => x.maLuong == id));

            _context.SaveChanges();

            return id;
        }
    }
}
