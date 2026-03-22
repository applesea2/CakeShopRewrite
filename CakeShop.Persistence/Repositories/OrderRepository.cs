using CakeShop.Persistence.Context;
using CakeShop.Persistence.Entities;

namespace CakeShop.Persistence.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly CakeShopDbContext _db;

    public OrderRepository(CakeShopDbContext db)
    {
        _db = db;
    }

    public async Task AddOrderAsync(Order order)
    {
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();
    }
}
