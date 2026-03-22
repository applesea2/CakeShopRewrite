namespace CakeShop.Service.Order;

public class OrderDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string CakeType { get; set; } = string.Empty;
    public string CakeSize { get; set; } = string.Empty;
    public string CakeFlavor { get; set; } = string.Empty;
    public string FrostingFlavor { get; set; } = string.Empty;
    public string DateNeeded { get; set; } = string.Empty;
    public string? SpecialInstructions { get; set; }
}
