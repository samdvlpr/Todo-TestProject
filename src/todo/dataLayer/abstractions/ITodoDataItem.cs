using System;

namespace Todo.DataLayer.Abstractions
{
    public interface ITodoDataItem
    {
        Guid Id { get; set; }
        
        string Title { get; set; }

        string Description { get; set; }

        DateTime Created { get; set; }

        DateTime? CompleteBy { get; set; }

        bool IsComplete { get; set; }
    }
}
