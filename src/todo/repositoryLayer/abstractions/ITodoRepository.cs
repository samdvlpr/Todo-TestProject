using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.DataLayer.Abstractions;
using XServiceBuilderLibrary.Abstractions;

namespace Todo.RepositoryLayer.Abstractions
{
    public interface ITodoRepository : IXService
    {
        Task<Guid> AddAsync(ITodoDataItem todoDataItem);

        Task<IEnumerable<ITodoDataItem>> GetAllAsync(bool IncludeCompleted);

        Task UpdateAsync(ITodoDataItem todoDataItem);

        Task DeleteAsync(Guid id);

        Task<ITodoDataItem> GetAsync(Guid id);
    }
}
