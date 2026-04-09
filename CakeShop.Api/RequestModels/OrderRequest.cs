using System.ComponentModel.DataAnnotations;

namespace CakeShop.Api.RequestModels;

public record OrderRequest : IValidatableObject
{
    [Required(ErrorMessage = "Name is required.")]
    [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
    public string? Name { get; init; }

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "A valid email address is required.")]
    [MaxLength(200, ErrorMessage = "Email cannot exceed 200 characters.")]
    public string? Email { get; init; }

    [Required(ErrorMessage = "Phone is required.")]
    [RegularExpression(@"^\(\d{3}\) \d{3}-\d{4}$", ErrorMessage = "Phone must be in the format (XXX) XXX-XXXX.")]
    [MaxLength(20, ErrorMessage = "Phone cannot exceed 20 characters.")]
    public string? Phone { get; init; }

    [Required(ErrorMessage = "Cake type is required.")]
    [MaxLength(50, ErrorMessage = "Cake type cannot exceed 50 characters.")]
    public string? CakeType { get; init; }

    [Required(ErrorMessage = "Cake size is required.")]
    [MaxLength(50, ErrorMessage = "Cake size cannot exceed 50 characters.")]
    public string? CakeSize { get; init; }

    [Required(ErrorMessage = "Cake flavor is required.")]
    [MaxLength(50, ErrorMessage = "Cake flavor cannot exceed 50 characters.")]
    public string? CakeFlavor { get; init; }

    [MaxLength(50, ErrorMessage = "Frosting flavor cannot exceed 50 characters.")]
    public string? FrostingFlavor { get; init; }

    [Required(ErrorMessage = "Date needed is required.")]
    [MaxLength(50)]
    public string? DateNeeded { get; init; }

    [MaxLength(500, ErrorMessage = "Special instructions cannot exceed 500 characters.")]
    public string? SpecialInstructions { get; init; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrWhiteSpace(DateNeeded)) yield break;

        if (!DateOnly.TryParse(DateNeeded, out var date))
        {
            yield return new ValidationResult("Date needed must be a valid date.", [nameof(DateNeeded)]);
            yield break;
        }

        var minDate = DateOnly.FromDateTime(DateTime.Today.AddDays(3));
        if (date < minDate)
            yield return new ValidationResult(
                "Date needed must be at least 3 days from today.", [nameof(DateNeeded)]);
    }
}
