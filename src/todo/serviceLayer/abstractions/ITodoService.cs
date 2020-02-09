using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Todo.Abstractions;
using XServiceBuilderLibrary.Abstractions;

namespace Todo.ServiceLayer.Abstractions
{
    public interface ITodoService : IXService
    {
        //Todo: Add Pagination
        Task<IEnumerable<ITodoItem>> GetTodosAsync(bool IncludeCompleted);

        Task ReOpenAsync(Guid id);

        Task AddTodoAsync(ITodoItem item);

        Task MarkTodoCompleteAsync(Guid id);
    }
}
