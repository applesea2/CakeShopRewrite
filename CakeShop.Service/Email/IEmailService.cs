namespace CakeShop.Service.Email;

public interface IEmailService
{
    public Task SendEmailAsync(string? name, string? email, string? phone, string? comment);
}