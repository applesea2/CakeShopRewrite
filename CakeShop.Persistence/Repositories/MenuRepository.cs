using CakeShop.Persistence.Context;
using CakeShop.Persistence.Entities;

namespace CakeShop.Persistence.Repositories;

public class MenuRepository : IMenuRepository
{
    private readonly CakeShopDbContext _db;

    public MenuRepository(CakeShopDbContext db)
    {
        _db = db;
    }
    public List<Item?> GetListOfItems()
    {
        return _db.Items.ToList();
    }

    public Item? GetItemById(int id)
    {
        return _db.Items.Find(id);
    }
}