using Microsoft.EntityFrameworkCore;

namespace JobBoardServer.Data
{
    internal static class JobsRepository
    {
        internal async static Task<IEnumerable<Job>> GetJobsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.JobList.ToListAsync();
            }
        }

        internal async static Task<Job> GetJobByIdAsync(int jobId)
        {
            using(var db = new AppDBContext())
            {
                return await db.JobList.FirstOrDefaultAsync(job => job.Id == jobId);
            }
        }

        internal async static Task<bool> CreateJobAsync(Job jobToCreate)
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

        internal async static Task<bool> UpdateJobAsync(Job jobToUpdate)
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
        internal async static Task<bool> DeleteJobAsync(int jobId)
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
