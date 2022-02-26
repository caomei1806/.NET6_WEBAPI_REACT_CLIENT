using JobBoardServer.Data.Repositories;
using JobBoardServer.Models;

namespace JobBoardServer.Services
{
    public class UserService : IUserService
    {
        public User Get(UserLogin userLogin)
        {
            User user = UserRepository.Users.FirstOrDefault(o => o.EmailAddress.Equals(userLogin.EmailAddress, StringComparison.OrdinalIgnoreCase) && o.Password.Equals(userLogin.Password));
            return user;
        }
    }
}
