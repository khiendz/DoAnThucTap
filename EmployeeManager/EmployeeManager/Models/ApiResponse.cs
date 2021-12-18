using static EmployeeManager.Models.Enum;

namespace EmployeeManager.Models
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public StatusCode? StatusCode { get; set; }
        public string Message { get; set; }
    }
}
