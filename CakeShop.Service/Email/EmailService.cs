using System.Text;
using MailKit.Net.Smtp;
using MailKit;
using Microsoft.Extensions.Options;
using MimeKit;

namespace CakeShop.Service.Email;

public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;

    public EmailService(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;
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
        using var client = new SmtpClient();
        await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, _emailSettings.UseSSL);
        await client.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}