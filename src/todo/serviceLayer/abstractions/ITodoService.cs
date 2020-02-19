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
        Task<IEnumerable<ITodoItem>> GetTodosAsync(bool includeCompleted);

        Task ReOpenAsync(Guid id);

        Task<Guid> AddTodoAsync(ITodoItem item);

        Task EditTodoAsync(ITodoEditItem item);

        Task DeleteTodoAsync(Guid id);

        Task MarkTodoCompleteAsync(Guid id);
    }
}
