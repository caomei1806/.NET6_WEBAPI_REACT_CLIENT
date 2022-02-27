using JobBoardServer.Data;

namespace JobBoardServer.Services
{
    public interface IJobsService
    {
        public Task<IEnumerable<Job>> GetJobsAsync();
        public Task<Job> GetJobByIdAsync(int jobId);
        public Task<bool> CreateJobAsync(Job jobToCreate);
        public Task<bool> UpdateJobAsync(Job jobToUpdate);
        public Task<bool> DeleteJobAsync(int jobId);
    }
}
