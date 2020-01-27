using System;
using System.IO;
using System.Linq;
using AutoMapper;
using NUnit.Framework;
using Todo;
using Todo.DataLayer;
using Todo.ServiceLayer;
using Todo.ServiceLayer.Abstractions;
using Todo.Tests.MoqObjects;

namespace Todo.Tests
{
    [TestFixture]
    public class TodoAddingTests
    {
        private ITodoService _todoService;

        private MoqRepository _moqRepository;


        [SetUp]
        public void Setup()
        {
            _moqRepository = new MoqRepository();
            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<TodoItemMap>()));
            _todoService = new TodoService(_moqRepository, mapper);
        }

        [Test]
        public void AddTodo()
        {
            var todo = new TodoItem() { Title = "Test Title", IsComplete = false };

            _todoService.AddTodoAsync(todo);

            var addedTodo = _moqRepository.Items.First();
            
            Assert.That(() =>
                (addedTodo.Id == todo.Id && addedTodo.Title == todo.Title && addedTodo.IsComplete == todo.IsComplete)
            );
        }

        [Test]
        public void AddTodoWithEmptyValue()
        {
            var todo = new TodoItem() { Title = "", IsComplete = false };

            Assert.ThrowsAsync<InvalidDataException>(async () =>
                await _todoService.AddTodoAsync(todo)
            );
        }
        
        [Test]
        public void StandardUserAddTodo()
        {
            Assert.Fail();
        }

        [Test]
        public void AdminUserAddTodo()
        {
            Assert.Fail();
        }
    }
}