using Backend.Domain.Abstractions.Repositories;
using Backend.Domain.Models;
using Backend.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataAccess.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UsersRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User> GetById(Guid id)
    {
        try
        {
            UserEntity? entity = await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

            if(entity is null){
                return new User();
            }

            return new User
            {
                Id = entity.Id,
                Nickname = entity.Nickname,
                Password = entity.Password
            };
        }
        catch(Exception){
            return new User();
        }
    }

    public async Task<User> CreateUser(User user)
    {
        try
        {
            UserEntity entity = new UserEntity
            {
                Id = user.Id,
                Nickname = user.Nickname,
                Password = user.Password
            };
            
            await _dbContext.Users.AddAsync(entity);

            await _dbContext.SaveChangesAsync();
            
            return user;
        }
        catch (Exception)
        {
            return new User();
        }
    }
}
