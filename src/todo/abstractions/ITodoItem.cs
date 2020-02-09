using System;

namespace Todo.Abstractions
{
    public interface ITodoItem
    {
        Guid Id { get; }

        string Title { get; set; }

        string Description { get; set; }
        
        DateTime Created { get; }

        DateTime? CompleteBy { get; set; }

        bool IsComplete { get; set; }
    }
}
