using BlockbusterApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlockbusterApi.Data
{
    public class AppDataContext : IdentityDbContext
    {
        public DbSet<Prestador> Prestador { get; set; }
        public DbSet<Servico> Servico { get; set; }
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Prestador>().HasData(
                new Prestador
                {
                    Id = 1,
                    Name= "Joao",
                    Servico="Reparos",
                },
                new Prestador
                {
                    Id = 2,
                    Name = "Roberto",
                    Servico = "Limpeza",
                },
                new Prestador
                {
                    Id = 3,
                    Name = "Maria",
                    Servico = "Elétrica",
                }
                );
        }
    }
}