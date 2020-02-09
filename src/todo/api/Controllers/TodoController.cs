using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Todo;
using Todo.Abstractions;
using Todo.ServiceLayer.Abstractions;
using TodoAPI;

namespace Endpoints.Todo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {

        private readonly ILogger<TodoController> _logger;
        private readonly ITodoService _todoService;
        private readonly IOptions<ConnectionStringsOption> _constring;

        public TodoController(ILogger<TodoController> logger, ITodoService todoService , IOptions<ConnectionStringsOption> constring)
        {
            _logger = logger;
            _todoService = todoService;
            _constring = constring;
        }

        [HttpGet]
        [Route("conString")]
        public async Task<string> GetAsync()
        {
        //    return "hello world";
            return _constring.Value.TodoDatabase;
        }

        [HttpGet]
        public async Task<IEnumerable<ITodoItem>> GetAsync(bool IncludeCompleted)
        {
            return await _todoService.GetTodosAsync(IncludeCompleted);
        }

        [HttpPost]
        [Route("MarkComplete")]
        public async Task MarkCompleteAsync(string id)
        {
            await _todoService.MarkTodoCompleteAsync(Guid.Parse(id));
        }

        [HttpPost]
        [Route("ReOpen")]
        public async Task ReOpenAsync(string id)
        {
            await _todoService.ReOpenAsync(Guid.Parse(id));
        }

        /* Send a populated TodoItem into this API controller method to pass onto the Todoservice to handle the add. */
        [HttpPost]
        public void AddAsync([FromBody]TodoItem item)
        {
            _logger.Log(LogLevel.Trace, $"Todo Controller called with data { JsonConvert.SerializeObject(item) }.");
            
            _todoService.AddTodoAsync(item);
        }
    }
}
