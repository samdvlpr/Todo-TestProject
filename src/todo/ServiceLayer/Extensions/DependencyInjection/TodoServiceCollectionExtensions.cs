
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using XServiceBuilderLibrary.Abstractions;

namespace Todo.ServiceLayer.Extensions.DependencyInjection
{
    public static class TodoServiceCollectionExtensions
    {
        public static IXServiceBuilder AddTodoServiceCollection(this IXServiceBuilder builder)
        {
            builder.RegisterLibrary();
            
            return builder;
        }
    }
}
