using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Todo.DataLayer;
using Todo.DataLayer.Abstractions;
using Todo.RepositoryLayer.Abstractions;

namespace Todo.RepositoryLayer
{
    public class TodoDBRepository : ITodoRepository
    {
        private readonly TodoContext _context;
        private readonly IMapper _mapper;

        public TodoDBRepository(TodoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(ITodoDataItem todoDataItem)
        {
            todoDataItem.Created = DateTime.Now;
            await _context.Todo.AddAsync(_mapper.Map<TodoDataItem>(todoDataItem));
            _context.SaveChanges();
        }

        public async Task UpdateAsync(ITodoDataItem todoDataItem)
        {
            var todo = _context.Todo.FirstOrDefault(t => t.Id == todoDataItem.Id); ;
            _mapper.Map(todoDataItem, todo);
            _context.Todo.Update(todo);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<ITodoDataItem>> GetAllAsync(bool IncludeCompleted)
        {
           return _context.Todo.Where(t => IncludeCompleted || !t.IsComplete).AsEnumerable();
        }
        
        public async Task<ITodoDataItem> GetAsync(Guid id)
        {
            return _context.Todo.FirstOrDefault(t => t.Id == id);
        }
    }
}
