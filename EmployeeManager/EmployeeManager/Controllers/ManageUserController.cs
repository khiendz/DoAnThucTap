using EmployeeManager.Authentication;
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
        private readonly BaseController _baseController;
        private readonly QUANLYNHANVIENContext _context;

        public ManageUserController(QUANLYNHANVIENContext context, BaseController baseController)
        {
            _context = context;
            _baseController = baseController;
        }

        [HttpGet]
        [Route("get-all")]
        public IEnumerable<Taikhoan> Get()
        {
            return _context.Taikhoan.ToList();
        }


        [HttpGet]
        [Route("get-all-user")]
        public IEnumerable<AccountToClient> GetAllUser()
        {
            List<Taikhoan> account = _context.Taikhoan.ToList();
            List<AccountToClient> obj = new List<AccountToClient>();

            foreach (Taikhoan user in account)
            {
                AccountToClient _obj = new AccountToClient();
                _obj.Id = user.Id;
                _obj.MaNhanVien = user.MaNhanVien;
                _obj.Password = user.Password;
                _obj.Role = user.Role;
                _obj.UserName = user.UserName;
                _obj.TenNhanVien = _context.Nhanvien.FirstOrDefault(x => x.MaNhanVien == _obj.MaNhanVien).TenNhanVien;
                obj.Add(_obj);
            }
            return obj;
        }

        // GET: api/Employees/5
        [HttpGet("get-detail/{id}")]
        public Taikhoan GetDepartment(string id)
        {
            var department = _context.Taikhoan.Where(em => em.UserName == id)
                                              .FirstOrDefault();
            return department;
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> PutDepartment(string id, Taikhoan department)
        {

            //var response = _baseController.PostRequest2<Task<IActionResult>>("https://localhost:44344/api/authenticate", "update-user", department);

            if (id != department.Id)
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
        [HttpPost("create")]
        public async Task<ActionResult<Taikhoan>> PostDepartment([FromBody] Taikhoan department)
        {
            department.Id = Guid.NewGuid().ToString();
            await _context.Taikhoan.AddAsync(department);
            await _context.SaveChangesAsync();
                

            return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Taikhoan>> DeleteDepartment(string id)
        {

            var department = _context.Taikhoan.Where(x => x.MaNhanVien == id).FirstOrDefault();
         
            if (department == null)
            {
                return NotFound();
            }

            _context.Taikhoan.Remove(department);
            await _context.SaveChangesAsync();

            return department;
        }

        private bool DepartmentExists(string id)
        {
            return _context.Taikhoan.Any(e => e.MaNhanVien == id);
        }
    }
}
