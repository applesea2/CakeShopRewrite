using CakeShop.Persistence.Entities;

namespace CakeShop.Persistence.Repositories;

public interface IMenuRepository
{
    public List<Item?> GetListOfItems();
    
    public Item? GetItemById(int id);
}