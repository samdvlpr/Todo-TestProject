using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Todo.Abstractions;
using Todo.DataLayer.Abstractions;
using Todo.ServiceLayer.Abstractions;
using Todo.RepositoryLayer.Abstractions;

namespace Todo.ServiceLayer
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;
        private readonly IMapper _mapper;

        public TodoService(ITodoRepository todoRepository, IMapper mapper)
        {
            _todoRepository = todoRepository;
            _mapper = mapper;
        }

        public  async Task<IEnumerable<ITodoItem>> GetTodosAsync(bool IncludeCompleted)
        {
            var data = await _todoRepository.GetAllAsync(IncludeCompleted);

            var result = data.Select(d => _mapper.Map<ITodoItem>(d));

            return result;
        }

        public async Task ReOpenAsync(Guid id)
        {
            var todo = await _todoRepository.GetAsync(id);
            todo.IsComplete = false;
            await _todoRepository.UpdateAsync(todo);
        }

        public async Task MarkTodoCompleteAsync(Guid id)
        {
            var todo = await _todoRepository.GetAsync(id);
            todo.IsComplete = true;
            await _todoRepository.UpdateAsync(todo);
        }

        public async Task AddTodoAsync(ITodoItem Item)
        {
            var data = _mapper.Map<ITodoDataItem>(Item);

            if(string.IsNullOrWhiteSpace(data.Title))
                throw new InvalidDataException("Cannot add a empty title todo item");

            await _todoRepository.AddAsync(data);
        }
    }
}
