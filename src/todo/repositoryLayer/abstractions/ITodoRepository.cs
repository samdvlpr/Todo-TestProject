using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.DataLayer.Abstractions;
using XServiceBuilderLibrary.Abstractions;

namespace Todo.RepositoryLayer.Abstractions
{
    public interface ITodoRepository : IXService
    {
        Task AddAsync(ITodoDataItem todoDataItem);

        Task<IEnumerable<ITodoDataItem>> GetAllAsync(bool IncludeCompleted);

        Task UpdateAsync(ITodoDataItem todoDataItem);

        Task<ITodoDataItem> GetAsync(Guid id);
    }
}
