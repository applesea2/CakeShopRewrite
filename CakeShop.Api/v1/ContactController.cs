using CakeShop.Api.RequestModels;
using CakeShop.Service.Email;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CakeShop.Api.v1;
[ApiController]
[Route("api/v1/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IEmailService emailService, ILogger<ContactController> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
    {
        try
        {
            await _emailService.SendEmailAsync(request.Name, request.Email, request.Phone, request.Comment);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email for contact request from {Email}", request.Email);
            return StatusCode(500, "Failed to send email. Please try again later.");
        }
    }
}
