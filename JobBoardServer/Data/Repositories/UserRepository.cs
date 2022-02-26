using JobBoardServer.Models;

namespace JobBoardServer.Data.Repositories
{
    public class UserRepository
    {
        public static List<User> Users = new() { 
            new() { Id = 1,EmailAddress = "karo.admin@email.com", Password = "haslo123", FirstName = "Karo", LastName = "Lina", Role = "admin" },
            new() { Id = 2,EmailAddress = "via.admin@email.com", Password = "haslo321", FirstName = "Via", LastName = "Oli", Role = "user" },

        };

    }
}
