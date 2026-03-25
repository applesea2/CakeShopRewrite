using CakeShop.Persistence.Entities;

namespace CakeShop.Persistence.Repositories;

public interface IOptionsRepository
{
    List<CakeSize> GetCakeSizes();
    List<FrostingOption> GetFrostingOptions();
}
