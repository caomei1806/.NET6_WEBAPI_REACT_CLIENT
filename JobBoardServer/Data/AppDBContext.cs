
using JobBoardServer.Data.Repositories;
using JobBoardServer.Models;
using Microsoft.EntityFrameworkCore;

namespace JobBoardServer.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Job> JobList { get; set; }
        public DbSet<User> UserList { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source =./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Job>()
                .Property(prop => prop.Title)
                .IsRequired();
            modelBuilder.Entity<Job>()
                .Property(prop => prop.Description)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(prop => prop.EmailAddress)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(prop => prop.Password)
                .IsRequired();

            Job[] jobsToSeed = new Job[5];
            for(int i = 1; i <= 5; i++)
            {
                jobsToSeed[i - 1] = new Job
                {
                    Id = i ,
                    Title = $"Job{i}",
                    Description = $"Description of job {i}"
                };
            }
            modelBuilder.Entity<Job>().HasData(jobsToSeed);
            modelBuilder.Entity<User>().HasData(UserRepository.Users);
        }
    }
}
