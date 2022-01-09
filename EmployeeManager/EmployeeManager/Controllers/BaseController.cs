using Amazon.CodePipeline.Model;
using EmployeeManager.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace EmployeeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public BaseController(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.Timeout = TimeSpan.FromMilliseconds(-1);
        }

        //public ApiResult<T> GetRequest<T>(string endPoint, string functionApi)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.GetAsync(requestUrl).Result;

        //    return ReadStringAsObject<T>(responseMessage);
        //}

        //public T GetRequest2<T>(string endPoint, string functionApi)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.GetAsync(requestUrl).Result;
        //    return ReadStringAsObject2<T>(responseMessage);
        //}

        //public async Task<T> GetRequestAsync<T>(string endPoint, string functionApi)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    var response = await _httpClient.GetAsync(requestUrl);
        //    var result = JsonConvert.DeserializeObject<T>(await response.Content.ReadAsStringAsync());
        //    return result;
        //}

        //public HttpResponseMessage GetHttpResponseMessage(string endPoint, string functionApi)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.GetAsync(requestUrl).Result;

        //    return responseMessage;
        //}

        //public ApiResult<T> PostRequest<T>(string endPoint, string functionApi, object model)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.PostAsJsonAsync(requestUrl, model).Result;
        //    return ReadStringAsObject<T>(responseMessage);
        //}

        //public T PostRequest2<T>(string endPoint, string functionApi, object model)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.PostAsJsonAsync(requestUrl, model).Result;
        //    return ReadStringAsObject2<T>(responseMessage);
        //}

        //public async Task<T> PostRequestAsync<T>(string endPoint, string functionApi, object model)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    var response = await _httpClient.PostAsJsonAsync(requestUrl, model);
        //    var result = JsonConvert.DeserializeObject<T>(await response.Content.ReadAsStringAsync());
        //    return result;
        //}

        //public HttpResponseMessage PostHttpResponseMessage<T>(string endPoint, string functionApi, object model)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    var responseMessage = new HttpResponseMessage();
        //    if (model is MultipartFormDataContent httpContent)
        //    {
        //        responseMessage = _httpClient.PostAsync(requestUrl, httpContent).Result;
        //        return responseMessage;
        //    }
        //    responseMessage = _httpClient.PostAsJsonAsync(requestUrl, model).Result;
        //    return responseMessage;
        //}

        //public ApiResult<T> DeleteRequest<T>(string endPoint, string functionApi)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.DeleteAsync(requestUrl).Result;

        //    return ReadStringAsObject<T>(responseMessage);
        //}

        //public T DeleteRequest2<T>(string endPoint, string functionApi)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.DeleteAsync(requestUrl).Result;
        //    return ReadStringAsObject2<T>(responseMessage);
        //}

        //public ApiResult<T> PutRequest<T>(string endPoint, string functionApi, object model)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.PutAsJsonAsync(requestUrl, model).Result;

        //    return ReadStringAsObject<T>(responseMessage);

        //}

        //public T PutRequest2<T>(string endPoint, string functionApi, object model)
        //{
        //    var requestUrl = endPoint + functionApi;
        //    HttpResponseMessage responseMessage = _httpClient.PutAsJsonAsync(requestUrl, model).Result;
        //    return ReadStringAsObject2<T>(responseMessage);
        //}

        //private static ApiResult<T> ReadStringAsObject<T>(HttpResponseMessage responseMessage)
        //{
        //    if (responseMessage.IsSuccessStatusCode)
        //    {
        //        var data = typeof(T) == typeof(string) ? (T)(object)responseMessage.Content.ReadAsStringAsync().Result : responseMessage.Content.ReadAsAsync<T>().Result;
        //        return new ApiResult<T> { Data = data };
        //    }

        //    var message = responseMessage.Content.ReadAsStringAsync().Result;
        //    var error = StringToErrorJson<T>(message);
        //    error.StatusCode = responseMessage.StatusCode;
        //    error.Code = (int)responseMessage.StatusCode;
        //    return new ApiResult<T>
        //    {
        //        Error = error
        //    };
        //}

        //private static T ReadStringAsObject2<T>(HttpResponseMessage responseMessage)
        //{
        //    if (responseMessage.IsSuccessStatusCode)
        //    {
        //        var data = typeof(T) == typeof(string) ? (T)(object)responseMessage.Content.ReadAsStringAsync().Result : responseMessage.Content.ReadAsAsync<T>().Result;
        //        return data;
        //    }
        //    if (!string.IsNullOrEmpty(responseMessage.Content.ReadAsStringAsync().Result))
        //    {
        //        var responseError = JsonConvert.DeserializeObject<ErrorDetails>(responseMessage.Content.ReadAsStringAsync().Result);
        //        throw new Exception(responseError.Message);
        //    }
        //    throw new Exception(responseMessage.StatusCode.ToString());
        //}

        //private static ApiResult<T>.ResponseError StringToErrorJson<T>(string message)
        //{
        //    if (string.IsNullOrEmpty(message))
        //    {
        //        return new ApiResult<T>.ResponseError
        //        {
        //            Code = 3,
        //            Messages = Array.Empty<string>()
        //        };
        //    }
        //    try
        //    {
        //        return JsonConvert.DeserializeObject<ApiResult<T>.ResponseError>(message);
        //    }
        //    catch
        //    {
        //        return new ApiResult<T>.ResponseError
        //        {
        //            Code = 3,
        //            Messages = new string[] { message }
        //        };
        //    }
        //}
    }
}
