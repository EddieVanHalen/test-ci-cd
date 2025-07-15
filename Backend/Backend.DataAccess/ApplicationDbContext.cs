using Microsoft.EntityFrameworkCore;
using Backend.DataAccess.Entities;
using Backend.DataAccess.Entities.Configurations;

namespace Backend.DataAccess;

public class ApplicationDbContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }    

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        new UserEntityConfiguration().Configure(modelBuilder.Entity<UserEntity>());
    }
}
