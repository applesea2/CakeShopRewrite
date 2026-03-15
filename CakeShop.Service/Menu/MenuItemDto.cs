namespace Cakeshop.Service.Menu;

public class MenuItemDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImagePath { get; set; }
    public decimal? Price { get; set; }
}