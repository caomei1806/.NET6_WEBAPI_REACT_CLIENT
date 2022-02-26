using JobBoardServer.Models;

namespace JobBoardServer.Services
{
    public interface IUserService
    {
        public User Get(UserLogin userLogin);
    }
}
