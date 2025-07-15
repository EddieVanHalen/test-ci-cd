using Microsoft.EntityFrameworkCore;
using Backend.DataAccess;
using Backend.DataAccess.Repositories;
using Backend.Domain.Abstractions.Repositories;

namespace Backend.Api.Extensions;

public static class ServicesExtensions
{
    public static void AddDatabase(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(x => x.UseNpgsql(connectionString));
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUsersRepository, UsersRepository>();
    }
}
