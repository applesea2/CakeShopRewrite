using System.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;

namespace CakeShop.Service.Email;

public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
    {
        _emailSettings = emailSettings.Value;
        _logger = logger;
    }
    public async Task SendEmailAsync(string? name, string? email, string? phone, string? comment)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
        message.To.Add(new MailboxAddress("Jesse Stroster", _emailSettings.SenderEmail));
        message.ReplyTo.Add(new MailboxAddress(name, email));
        message.Subject = "CakeShop Order/Questions";
        StringBuilder body = new StringBuilder(name ?? "No name provided.");
        body.Append(' ');
        body.Append("contacted you regarding a cake. Call back at");
        body.Append(' ');
        body.Append(phone ?? "No phone provided");
        body.AppendLine(".");
        body.AppendLine();
        body.Append(comment ?? "No comment provided");
        message.Body = new TextPart("plain")
        {
            Text = body.ToString()
        };
        var secureSocketOptions = _emailSettings.UseSSL
            ? SecureSocketOptions.SslOnConnect
            : _emailSettings.UseStartTls
                ? SecureSocketOptions.StartTls
                : SecureSocketOptions.Auto;

        using var client = new SmtpClient();
        _logger.LogInformation("Connecting to {SmtpServer}:{Port} with {SecurityOption}",
            _emailSettings.SmtpServer, _emailSettings.Port, secureSocketOptions);
        await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, secureSocketOptions);
        await client.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

    public async Task SendOrderEmailAsync(string? name, string? email, string? phone, string? cakeType,
        string? cakeSize, string? cakeFlavor, string? frostingFlavor, string? dateNeeded,
        string? specialInstructions)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
        message.To.Add(new MailboxAddress("Jesse Stroster", _emailSettings.SenderEmail));
        message.ReplyTo.Add(new MailboxAddress(name, email));
        message.Subject = "New Cake Order Request";

        StringBuilder body = new StringBuilder();
        body.AppendLine("New Cake Order Request");
        body.AppendLine("======================");
        body.AppendLine();
        body.AppendLine($"Name: {name ?? "Not provided"}");
        body.AppendLine($"Email: {email ?? "Not provided"}");
        body.AppendLine($"Phone: {phone ?? "Not provided"}");
        body.AppendLine();
        body.AppendLine("Order Details");
        body.AppendLine("-------------");
        body.AppendLine($"Cake Type: {cakeType ?? "Not specified"}");
        body.AppendLine($"Cake Size: {cakeSize ?? "Not specified"}");
        body.AppendLine($"Cake Flavor: {cakeFlavor ?? "Not specified"}");
        body.AppendLine($"Frosting Flavor: {frostingFlavor ?? "Not specified"}");
        body.AppendLine($"Date Needed: {dateNeeded ?? "Not specified"}");
        body.AppendLine();
        body.AppendLine("Special Instructions");
        body.AppendLine("--------------------");
        body.AppendLine(specialInstructions ?? "None");

        message.Body = new TextPart("plain")
        {
            Text = body.ToString()
        };

        var secureSocketOptions = _emailSettings.UseSSL
            ? SecureSocketOptions.SslOnConnect
            : _emailSettings.UseStartTls
                ? SecureSocketOptions.StartTls
                : SecureSocketOptions.Auto;

        using var client = new SmtpClient();
        _logger.LogInformation("Connecting to {SmtpServer}:{Port} with {SecurityOption}",
            _emailSettings.SmtpServer, _emailSettings.Port, secureSocketOptions);
        await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, secureSocketOptions);
        await client.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}