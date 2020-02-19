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

        public async Task<Guid> AddAsync(ITodoDataItem todoDataItem)
        {
            todoDataItem.Created = DateTime.Now;

            var item = await _context.Todo.AddAsync(_mapper.Map<TodoDataItem>(todoDataItem));

            await _context.SaveChangesAsync();

            return item.Entity.Id;
        }

        public async Task UpdateAsync(ITodoDataItem todoDataItem)
        {
            var todo = _context.Todo.FirstOrDefault(t => t.Id == todoDataItem.Id);

            if (todo == null) throw new KeyNotFoundException();

            _mapper.Map(todoDataItem, todo);

            _context.Todo.Update(todo);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var todo = _context.Todo.FirstOrDefault(t => t.Id == id);

            if(todo == null) throw new KeyNotFoundException();

            _context.Todo.Remove(todo);

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ITodoDataItem>> GetAllAsync(bool IncludeCompleted)
        {
           return await Task.Run(() => _context.Todo.Where(t => IncludeCompleted || !t.IsComplete).AsEnumerable());
        }
        
        public async Task<ITodoDataItem> GetAsync(Guid id)
        {
            return await Task.Run(() => _context.Todo.FirstOrDefault(t => t.Id == id));
        }
    }
}
