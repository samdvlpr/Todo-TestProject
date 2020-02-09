using System.Reflection;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Todo.DataLayer;
using Todo.RepositoryLayer;
using XServiceBuilderLibrary.Abstractions;

namespace Todo.ServiceLayer.Extensions.DependencyInjection
{
    public static class TodoRepositoryServiceCollectionExtensions
    {
        public static IXServiceBuilder AddTodoRepositoryServiceCollection(this IXServiceBuilder builder)
        {
            builder.RegisterLibrary();

            var calling = Assembly.GetCallingAssembly().FullName;
            
            builder.Services.AddDbContext<TodoContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("TodoDatabase"),
                sqlopt => sqlopt.MigrationsAssembly(calling)));

            builder.Services.AddAutoMapper(typeof(TodoItemMap).Assembly);

            return builder;
        }
    }
}
