using CakeShop.Persistence.Repositories;
using Cakeshop.Service;
using Cakeshop.Service.Menu;

namespace CakeShop.Service.Menu;

public class MenuService : IMenuService
{
    private readonly IMenuRepository _menuRepository;

    public MenuService(IMenuRepository menuRepository)
    {
        _menuRepository = menuRepository;
    }

    public List<MenuItemDto?> GetMenuItems()
    {
        return _menuRepository.GetListOfItems()
            .Select(x => new MenuItemDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Category = x.Category,
                Price = x.Price
            })
            .ToList();
    }

    public MenuItemDto? GetMenuItemById(int id)
    {
        var item = _menuRepository.GetItemById(id);
        if (item is null) return null;
    
        return new MenuItemDto
        {
            Id = item.Id,
            Title = item.Title,
            Description = item.Description,
            Category = item.Category,
            Price = item.Price
        };
    }
}