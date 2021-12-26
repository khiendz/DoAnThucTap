using System;
using System.Collections.Generic;

namespace EmployeeManager.Models
{
    public class DocumentManager
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public string Path { get; set; }
    }
}
