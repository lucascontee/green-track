using Calculadora_CO2.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Calculadora_CO2.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public DbSet<Travel> Travels { get; set; }
    public DbSet<Goal> UserGoals { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);


        modelBuilder.Entity<Travel>()
            .Property(t => t.Id)
            .ValueGeneratedOnAdd();

        modelBuilder.Entity<Travel>()
            .Property(t => t.CreatedAt)
            .ValueGeneratedOnAdd()
            .HasDefaultValueSql("GETDATE()");

        modelBuilder.Entity<Goal>()
            .Property(ug => ug.Id)
            .ValueGeneratedOnAdd();
    }


}
