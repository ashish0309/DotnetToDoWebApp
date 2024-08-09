using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.DBContexts;

public class TodoContext(DbContextOptions<TodoContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;
}