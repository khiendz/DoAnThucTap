using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManager.Models
{
    public class Enum
    {
        public enum StatusCode
        {
            INTERNAL_SERVER_ERROR = 500,
            DUPLICATE = 409,
            MODEL_INVALID = 422,
            FILE_FORMAT_INVALID = 415,
            LINK_URL_INVALID = 501,
            USING = 226,
            FORMAT_INVALID = 415,
            BAD_REQUEST = 400,
            OK = 200,
            ACCEPTED = 202,
            NOT_FOUND = 11
        }
    }
}
