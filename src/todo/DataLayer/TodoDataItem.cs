using System;
using Todo.DataLayer.Abstractions;

namespace Todo.DataLayer
{
    public class TodoDataItem : ITodoDataItem
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public DateTime? CompleteBy { get; set; }

        public bool IsComplete { get; set; }
    }
}
