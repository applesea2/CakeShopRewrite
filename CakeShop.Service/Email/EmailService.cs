using System.Net;
using System.Reflection;
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

    private static string LoadTemplate(string resourceName, Dictionary<string, string> tokens)
    {
        var assembly = Assembly.GetExecutingAssembly();
        var fullName = $"CakeShop.Service.EmailTemplates.{resourceName}";
        using var stream = assembly.GetManifestResourceStream(fullName)
            ?? throw new InvalidOperationException($"Email template '{fullName}' not found in assembly.");
        using var reader = new StreamReader(stream);
        var html = reader.ReadToEnd();
        foreach (var (key, value) in tokens)
            html = html.Replace($"{{{{{key}}}}}", WebUtility.HtmlEncode(value));
        return html;
    }

    private async Task SendAsync(MimeMessage message)
    {
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

    public async Task SendEmailAsync(string? name, string? email, string? phone, string? comment)
    {
        var tokens = new Dictionary<string, string>
        {
            ["name"]    = name    ?? "Not provided",
            ["email"]   = email   ?? "Not provided",
            ["phone"]   = phone   ?? "Not provided",
            ["comment"] = comment ?? "No comment provided",
        };

        var builder = new BodyBuilder
        {
            HtmlBody  = LoadTemplate("Contact.html", tokens),
            TextBody  = $"New Contact Inquiry\n\nName: {tokens["name"]}\nEmail: {tokens["email"]}\nPhone: {tokens["phone"]}\n\nMessage\n-------\n{tokens["comment"]}",
        };

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
        message.To.Add(new MailboxAddress("Jesse Stroster", _emailSettings.SenderEmail));
        message.ReplyTo.Add(new MailboxAddress(name, email));
        message.Subject = "CakeShop Contact Us Inquiry";
        message.Body = builder.ToMessageBody();

        await SendAsync(message);
    }

    public async Task SendOrderEmailAsync(string? name, string? email, string? phone, string? cakeType,
        string? cakeSize, string? cakeFlavor, string? frostingFlavor, string? dateNeeded,
        string? specialInstructions)
    {
        var tokens = new Dictionary<string, string>
        {
            ["name"]                = name                ?? "Not provided",
            ["email"]               = email               ?? "Not provided",
            ["phone"]               = phone               ?? "Not provided",
            ["cakeType"]            = cakeType            ?? "Not specified",
            ["cakeSize"]            = cakeSize            ?? "Not specified",
            ["cakeFlavor"]          = cakeFlavor          ?? "Not specified",
            ["frostingFlavor"]      = frostingFlavor      ?? "Not specified",
            ["dateNeeded"]          = DateTime.TryParseExact(dateNeeded, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out var parsedDate) ? parsedDate.ToString("MMMM dd, yyyy") : "Not specified",
            ["specialInstructions"] = specialInstructions ?? "None",
        };

        var builder = new BodyBuilder
        {
            HtmlBody = LoadTemplate("OrderNotification.html", tokens),
            TextBody = $"New Cake Order Request\n\nName: {tokens["name"]}\nEmail: {tokens["email"]}\nPhone: {tokens["phone"]}\n\nCake Type: {tokens["cakeType"]}\nCake Size: {tokens["cakeSize"]}\nCake Flavor: {tokens["cakeFlavor"]}\nFrosting Flavor: {tokens["frostingFlavor"]}\nDate Needed: {tokens["dateNeeded"]}\n\nSpecial Instructions\n--------------------\n{tokens["specialInstructions"]}",
        };

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
        message.To.Add(new MailboxAddress("Jesse Stroster", _emailSettings.SenderEmail));
        message.ReplyTo.Add(new MailboxAddress(name, email));
        message.Subject = "New Cake Order Request";
        message.Body = builder.ToMessageBody();

        await SendAsync(message);
    }

    public async Task SendOrderConfirmationEmailAsync(string? name, string? email, string? phone, string? cakeType,
        string? cakeSize, string? cakeFlavor, string? frostingFlavor, string? dateNeeded,
        string? specialInstructions)
    {
        var tokens = new Dictionary<string, string>
        {
            ["name"]                = name                ?? "there",
            ["email"]               = email               ?? "Not provided",
            ["phone"]               = phone               ?? "Not provided",
            ["cakeType"]            = cakeType            ?? "Not specified",
            ["cakeSize"]            = cakeSize            ?? "Not specified",
            ["cakeFlavor"]          = cakeFlavor          ?? "Not specified",
            ["frostingFlavor"]      = frostingFlavor      ?? "Not specified",
            ["dateNeeded"]          = DateTime.TryParseExact(dateNeeded, "yyyy-MM-dd", null, System.Globalization.DateTimeStyles.None, out var parsedDate) ? parsedDate.ToString("MMMM dd, yyyy") : "Not specified",
            ["specialInstructions"] = specialInstructions ?? "None",
        };

        var builder = new BodyBuilder
        {
            HtmlBody = LoadTemplate("OrderConfirmation.html", tokens),
            TextBody = $"Hi {tokens["name"]},\n\nThank you for your order! We've received your request and will be in touch at our earliest convenience.\n\nOrder Summary\n=============\nCake Type: {tokens["cakeType"]}\nCake Size: {tokens["cakeSize"]}\nCake Flavor: {tokens["cakeFlavor"]}\nFrosting Flavor: {tokens["frostingFlavor"]}\nDate Needed: {tokens["dateNeeded"]}\n\nSpecial Instructions\n--------------------\n{tokens["specialInstructions"]}\n\nJesse's Cakes",
        };

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
        message.To.Add(new MailboxAddress(name, email));
        message.Subject = "Your Cake Order Has Been Received!";
        message.Body = builder.ToMessageBody();

        await SendAsync(message);
    }
}
