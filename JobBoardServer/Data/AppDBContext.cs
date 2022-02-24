
using Microsoft.EntityFrameworkCore;

namespace JobBoardServer.Data
{
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Job> JobList { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source =./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
        }
    }
}
