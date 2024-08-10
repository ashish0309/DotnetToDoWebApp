using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoApp.Models;
using TodoApp.Utils;

namespace TodoApp.DBContexts;

public class TodoContext(DbContextOptions<TodoContext> options, IUserProvider userProvider) : IdentityDbContext<TodoUser, TodoRole, string>(options)
{
    private readonly IUserProvider _userProvider = userProvider;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<TodoItem>().HasOne(todoItem => todoItem.TodoUser);
        modelBuilder.Entity<TodoItem>().HasQueryFilter(todoItem => todoItem.TodoUserId == _userProvider.GetUserId());
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;
}