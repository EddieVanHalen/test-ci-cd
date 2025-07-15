using Backend.Domain.Models;

namespace Backend.Domain.Abstractions.Repositories;

public interface IUsersRepository
{
    Task<User> GetById(Guid id);
    Task<User> CreateUser(User user);
}
