namespace CakeShop.Api.RequestModels;

public record OrderRequest
{
    public string? Name { get; init; }
    public string? Email { get; init; }
    public string? Phone { get; init; }
    public string? CakeType { get; init; }
    public string? CakeSize { get; init; }
    public string? CakeFlavor { get; init; }
    public string? FrostingFlavor { get; init; }
    public string? DateNeeded { get; init; }
    public string? SpecialInstructions { get; init; }
}
