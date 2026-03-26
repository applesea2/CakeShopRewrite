namespace CakeShop.Service.Email;
public interface IEmailService
{
    public Task SendEmailAsync(string? name, string? email, string? phone, string? comment);
    public Task SendOrderEmailAsync(string? name, string? email, string? phone, string? cakeType,
        string? cakeSize, string? cakeFlavor, string? frostingFlavor, string? dateNeeded,
        string? specialInstructions);
    public Task SendOrderConfirmationEmailAsync(string? name, string? email, string? phone, string? cakeType,
        string? cakeSize, string? cakeFlavor, string? frostingFlavor, string? dateNeeded,
        string? specialInstructions);
}