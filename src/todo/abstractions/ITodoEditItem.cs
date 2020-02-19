using System;

namespace Todo.Abstractions
{
    public interface ITodoEditItem
    {
        Guid Id { get; set; }

        string Title { get; set; }

        string Description { get; set; }

        DateTime? CompleteBy { get; set; }
    }
}
