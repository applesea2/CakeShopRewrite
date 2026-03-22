using CakeShop.Api.RequestModels;
using CakeShop.Service.Email;
using CakeShop.Service.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CakeShop.Api.v1;

[ApiController]
[Route("api/v1/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly IOrderService _orderService;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(IEmailService emailService, IOrderService orderService, ILogger<OrdersController> logger)
    {
        _emailService = emailService;
        _orderService = orderService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
    {
        try
        {
            await _orderService.PlaceOrderAsync(new OrderDto
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                CakeType = request.CakeType,
                CakeSize = request.CakeSize,
                CakeFlavor = request.CakeFlavor,
                FrostingFlavor = request.FrostingFlavor,
                DateNeeded = request.DateNeeded,
                SpecialInstructions = request.SpecialInstructions
            });

            await _emailService.SendOrderEmailAsync(
                request.Name, request.Email, request.Phone,
                request.CakeType, request.CakeSize, request.CakeFlavor,
                request.FrostingFlavor, request.DateNeeded, request.SpecialInstructions);

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process order request from {Email}", request.Email);
            return StatusCode(500, "Failed to submit order. Please try again later.");
        }
    }
}
