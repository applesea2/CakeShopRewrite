namespace CakeShop.Api.RequestModels;

public record EmailRequest
{
    public string? Name { get; init; }
    public string? Email { get; init; }
    public string? Phone { get; init; }
    public string? Comment { get; init; }
}
