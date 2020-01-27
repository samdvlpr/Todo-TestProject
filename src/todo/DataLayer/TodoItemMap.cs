using AutoMapper;
using Todo.Abstractions;
using Todo.DataLayer.Abstractions;

namespace Todo.DataLayer
{
    public class TodoItemMap : Profile
    {
        public TodoItemMap()
        {
            CreateMap<ITodoDataItem, TodoDataItem>();
            CreateMap<ITodoItem, ITodoDataItem>().ConstructUsing(src => new TodoDataItem());

            CreateMap<ITodoDataItem, ITodoItem>().ConstructUsing(src => new TodoItem(src.Id));
        }
    }
}
