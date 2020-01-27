using System;
using Todo;
using Microsoft.EntityFrameworkCore;
using Todo.DataLayer;


namespace Todo.RepositoryLayer
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<TodoDataItem> Todo { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoDataItem>(e =>
            {
                e.HasKey(f => f.Id);
                e.Property(f => f.Id).ValueGeneratedOnAdd();
                e.Property(f => f.Title).IsRequired();
                e.Property(f => f.Description).IsRequired();
                e.Property(f => f.Created).IsRequired();
                e.Property(f => f.CompleteBy);
            });
        }
    }
}
