using CakeShop.Service.Options;
using Microsoft.AspNetCore.Mvc;

namespace CakeShop.Api.v1;

[ApiController]
[Route("api/v1/[controller]")]
public class OptionsController : ControllerBase
{
    private readonly IOptionsService _optionsService;

    public OptionsController(IOptionsService optionsService)
    {
        _optionsService = optionsService;
    }

    [HttpGet("sizes")]
    public IActionResult GetSizes()
    {
        return Ok(_optionsService.GetCakeSizes());
    }

    [HttpGet("frostings")]
    public IActionResult GetFrostings()
    {
        return Ok(_optionsService.GetFrostingOptions());
    }
}
