namespace CakeShop.Service.Options;

public interface IOptionsService
{
    List<CakeSizeDto> GetCakeSizes();
    List<FrostingOptionDto> GetFrostingOptions();
}
