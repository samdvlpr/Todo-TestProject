using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Todo;
using Todo.Abstractions;
using Todo.ServiceLayer.Abstractions;

namespace Endpoints.Todo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {

        private readonly ILogger<TodoController> _logger;
        private readonly ITodoService _todoService;

        public TodoController(ILogger<TodoController> logger, ITodoService todoService)
        {
            _logger = logger;
            _todoService = todoService;
        }

        [HttpGet]
        public IEnumerable<ITodoItem> Get(bool IncludeCompleted)
        {
            return _todoService.GetTodosAsync(IncludeCompleted).Result;
        }

        [HttpPost]
        [Route("MarkComplete")]
        public void MarkComplete(string id)
        {
            _todoService.MarkTodoCompleteAsync(Guid.Parse(id));
        }

        /* Send a populated TodoItem into this API controller method to pass onto the Todoservice to handle the add. */
        [HttpPost]
        public void Add([FromBody]TodoItem item)
        {
            _logger.Log(LogLevel.Trace, $"Todo Controller called with data { JsonConvert.SerializeObject(item) }.");
            
            _todoService.AddTodoAsync(item);
        }
    }
}
