using System.Net;

namespace EmployeeManager.Model
{
    public class ApiResult<T>
    {
        public T Data { get; set; }

        public ResponseError Error { get; set; }

        public class ResponseError
        {
            public HttpStatusCode StatusCode { get; set; }

            public int Code { get; set; }

            public string[] Messages { get; set; }

            /// <summary>
            /// Get first message from messages array.
            /// It return Empty if Messages is null or empty.
            /// </summary>
            public string Message
            {
                get
                {
                    if (Messages == null && Messages.Length == 0)
                    {
                        return string.Empty;
                    }
                    return Messages[0];
                }
            }
        }
    }
}
