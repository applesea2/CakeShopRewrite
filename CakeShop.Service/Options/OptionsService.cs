using CakeShop.Persistence.Repositories;

namespace CakeShop.Service.Options;

public class OptionsService : IOptionsService
{
    private readonly IOptionsRepository _optionsRepository;

    public OptionsService(IOptionsRepository optionsRepository)
    {
        _optionsRepository = optionsRepository;
    }

    public List<CakeSizeDto> GetCakeSizes()
    {
        return _optionsRepository.GetCakeSizes()
            .Select(x => new CakeSizeDto { Id = x.Id, Name = x.Name })
            .ToList();
    }

    public List<FrostingOptionDto> GetFrostingOptions()
    {
        return _optionsRepository.GetFrostingOptions()
            .Select(x => new FrostingOptionDto { Id = x.Id, Name = x.Name })
            .ToList();
    }
}
