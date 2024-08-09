using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.DBContexts;

public class TodoUserDBContext : IdentityDbContext<TodoUser, TodoRole, string>
{
        public TodoUserDBContext(DbContextOptions<TodoUserDBContext> options)
        : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}