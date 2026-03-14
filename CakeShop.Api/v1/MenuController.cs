using CakeShop.Service.Menu;
using Microsoft.AspNetCore.Mvc;

namespace CakeShop.Api.v1;
[ApiController]
[Route("api/v1/[controller]")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;

    public MenuController(IMenuService menuService)
    {
        _menuService = menuService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var items = _menuService.GetMenuItems();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var item = _menuService.GetMenuItemById(id);
        if (item is null) return NotFound();
        return Ok(item);
    }
}