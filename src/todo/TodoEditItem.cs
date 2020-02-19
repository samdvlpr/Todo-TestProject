using System;
using Todo.Abstractions;

namespace Todo
{
    public class TodoEditItem : ITodoEditItem
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? CompleteBy { get; set; }
    }
}
