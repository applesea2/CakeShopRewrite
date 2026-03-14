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
    public IActionResult SendEmail([FromBody] EmailRequest request)
    {
        // stub until you wire up the email service
        return StatusCode(501);
    }
}