using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using EmployeeManager.Common;
using EmployeeManager.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerContractController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly QUANLYNHANVIENContext _context;

        public ManagerContractController(IConfiguration configuration, QUANLYNHANVIENContext context)
        {
            _context = context;
            _configuration = configuration;
        }
       
        [HttpGet]
        [Route("get")]
        public IEnumerable<Hopdong>Get()
        {
            return _context.Hopdong.ToList();
        }
        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<Hopdong>> PostContract(Hopdong contract)
        {
            contract.MaHopDong = Guid.NewGuid().ToString();
            _context.Hopdong.Add(contract);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContract", new { id = contract.MaHopDong }, contract);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(string id, Hopdong contact)
        {
            if (id != contact.MaHopDong)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
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
        [Route("upload")]
        public void UploadDocuments()
        {
            string inputPath = Path.Combine(_configuration["AppSetting:BaseFolder"], _configuration["AppSetting:InputTemplateFolder"]);
            var files = Request.Form.Files;
            files.ToList().ForEach(t =>
            {
                var extension = Path.GetExtension(t.FileName);

                if (extension.Trim().ToLower() == ".pdf")
                {
                    var filePath = Path.Combine(inputPath, t.FileName).RemoveInvalidCharacters();
                    var fileBytes = new BinaryReader(t.OpenReadStream()).ReadBytes((int)t.Length);
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath);
                    }
                    System.IO.File.WriteAllBytes(filePath, fileBytes);
                }

                Chitiethopdong dc = new Chitiethopdong();
                dc.MaChiTietHopDong = Guid.NewGuid().ToString();
                dc.Name = t.FileName;
                dc.Size = Helper.MeasureSizeOfFile(t.Length);
                dc.Path = Path.Combine(inputPath, t.FileName);
                _context.Chitiethopdong.Add(dc);
               _context.SaveChangesAsync();
            });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hopdong>> DeleteEmployee(string id)
        {
            var contract = await _context.Hopdong.FindAsync(id);
            if (contract == null)
            {
                return NotFound();
            }

            _context.Hopdong.Remove(contract);
            await _context.SaveChangesAsync();

            return contract;
        }
        [HttpPost]
        [Route("delete")]
        public async Task<Models.ApiResponse<bool>> DeleteDocument([FromBody] Chitiethopdong doc)
        {
            var filePath = doc.Path;
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            return new Models.ApiResponse<bool>
            {
                Data = true
            };
        }
        [HttpPost]
        [Route("download")]
        public IActionResult DownloadDocument([FromBody] Chitiethopdong doc)
        {
            var filePath = doc.Path;
            filePath = filePath.RemoveInvalidCharacters();
            if (!System.IO.File.Exists(filePath)) return null;
            var pdfFileData = System.IO.File.ReadAllBytes(filePath);
            return new FileContentResult(pdfFileData, "application/pdf");
        }
        private bool Exists(string id)
        {
            return _context.Hopdong.Any(e => e.MaHopDong == id);
        }
    }
}
