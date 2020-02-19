using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.DataLayer.Abstractions;
using Todo.RepositoryLayer.Abstractions;

namespace Todo.Tests.MoqObjects
{
    public class MoqRepository : ITodoRepository
    {
        public IEnumerable<ITodoDataItem> Items { get; private set; }

        public MoqRepository()
        {
            Items = new List<ITodoDataItem>();
        }
        
        public async Task<Guid> AddAsync(ITodoDataItem todoDataItem)
        {
            ((List<ITodoDataItem>)Items).Add(todoDataItem);
            return await Task.FromResult(Guid.Empty);
        }

        public Task<IEnumerable<ITodoDataItem>> GetAllAsync(bool IncludeCompleted)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(ITodoDataItem todoDataItem)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<ITodoDataItem> GetAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
