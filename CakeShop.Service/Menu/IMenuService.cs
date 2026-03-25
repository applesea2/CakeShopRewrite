using Cakeshop.Service;
using Cakeshop.Service.Menu;

namespace CakeShop.Service.Menu;

public interface IMenuService
{
    List<MenuItemDto> GetMenuItems();
    MenuItemDto? GetMenuItemById(int id);
}