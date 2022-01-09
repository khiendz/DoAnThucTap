using EmployeeManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageDocumentController : ControllerBase
    {
        private readonly QUANLYNHANVIENContext _context;

        public ManageDocumentController(QUANLYNHANVIENContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("get-document")]
        public IEnumerable<Chitiethopdong> Get()
        {
            return _context.Chitiethopdong.ToList();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Chitiethopdong>> DeleteEmployee(string id)
        {
            var contract = await _context.Chitiethopdong.FindAsync(id);
            if (contract == null)
            {
                return NotFound();
            }

            _context.Chitiethopdong.Remove(contract);
            await _context.SaveChangesAsync();

            return contract;
        }

    }
}
