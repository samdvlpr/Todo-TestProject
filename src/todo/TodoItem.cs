using System;
using System.Runtime.CompilerServices;
using Todo.Abstractions;

[assembly: InternalsVisibleTo("Todo.DataLayer")]
namespace Todo
{
    public class TodoItem : ITodoItem
    {
        public TodoItem() { }

        internal TodoItem(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; private set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; private set; }

        public DateTime? CompleteBy { get; set; }

        public bool IsComplete { get; set; }
    }
}
