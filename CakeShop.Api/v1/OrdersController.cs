using Microsoft.AspNetCore.Mvc;

namespace CakeShop.Api.v1;

[ApiController]
[Route("api/v1/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateOrder([FromBody] object request)
    {
        // stub until you design the order model
        return StatusCode(501);
    }
}