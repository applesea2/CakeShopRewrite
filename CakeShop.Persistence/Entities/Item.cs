using System;
using System.Collections.Generic;

namespace CakeShop.Persistence.Entities;

public partial class Item
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int ItemTypeId { get; set; }
    public decimal Price { get; set; }

    public ItemType ItemType { get; set; } = null!;
}
