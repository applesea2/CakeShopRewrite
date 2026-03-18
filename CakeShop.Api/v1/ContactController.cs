using CakeShop.Api.RequestModels;
using CakeShop.Service.Email;
using Microsoft.AspNetCore.Mvc;

namespace CakeShop.Api.v1;
[ApiController]
[Route("api/v1/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;

    public ContactController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
    {
        try
        {
            await _emailService.SendEmailAsync(request.Name, request.Email, request.Phone, request.Comment);
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "Failed to send email. Please try again later.");
        }
    }
}
