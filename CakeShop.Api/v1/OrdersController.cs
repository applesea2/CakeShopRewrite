using CakeShop.Api.RequestModels;
using CakeShop.Service.Email;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
namespace CakeShop.Api.v1;
[ApiController]
[Route("api/v1/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly ILogger<OrdersController> _logger;
    public OrdersController(IEmailService emailService, ILogger<OrdersController> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
    {
        try
        {
            await _emailService.SendOrderEmailAsync(
                request.Name, request.Email, request.Phone,
                request.CakeType, request.CakeSize, request.CakeFlavor,
                request.FrostingFlavor, request.DateNeeded, request.SpecialInstructions);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send order email for request from {Email}", request.Email);
            return StatusCode(500, "Failed to submit order. Please try again later.");
        }
    }
}
