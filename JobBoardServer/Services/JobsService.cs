using JobBoardServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace JobBoardServer.Data
{
    public class JobsService : IJobsService
    {
        public async Task<IEnumerable<Job>> GetJobsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.JobList.ToListAsync();
            }
        }

        public async Task<Job> GetJobByIdAsync(int jobId)
        {
            using(var db = new AppDBContext())
            {
                return await db.JobList.FirstOrDefaultAsync(job => job.Id == jobId);
            }
        }
        
        public async Task<bool> CreateJobAsync(Job jobToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.JobList.AddAsync(jobToCreate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch(Exception ex)
                {
                    return false;
                }
            }
        }

        [Authorize]
        public async Task<bool> UpdateJobAsync(Job jobToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.JobList.Update(jobToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
        public async Task<bool> DeleteJobAsync(int jobId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Job jobToDelete = await GetJobByIdAsync(jobId);
                    db.Remove(jobToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }
    }
}
