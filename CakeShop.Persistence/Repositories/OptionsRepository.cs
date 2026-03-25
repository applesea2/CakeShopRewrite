using CakeShop.Persistence.Context;
using CakeShop.Persistence.Entities;

namespace CakeShop.Persistence.Repositories;

public class OptionsRepository : IOptionsRepository
{
    private readonly CakeShopDbContext _db;

    public OptionsRepository(CakeShopDbContext db)
    {
        _db = db;
    }

    public List<CakeSize> GetCakeSizes()
    {
        return _db.CakeSizes
            .Where(x => x.IsActive)
            .OrderBy(x => x.DisplayOrder)
            .ToList();
    }

    public List<FrostingOption> GetFrostingOptions()
    {
        return _db.FrostingOptions
            .Where(x => x.IsActive)
            .OrderBy(x => x.DisplayOrder)
            .ToList();
    }
}
