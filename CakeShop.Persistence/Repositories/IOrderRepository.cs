using CakeShop.Persistence.Entities;

namespace CakeShop.Persistence.Repositories;

public interface IOrderRepository
{
    public Task AddOrderAsync(Order order);
}
