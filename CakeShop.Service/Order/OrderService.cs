using CakeShop.Persistence.Entities;
using CakeShop.Persistence.Repositories;

namespace CakeShop.Service.Order;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task PlaceOrderAsync(OrderDto order)
    {
        var entity = new Persistence.Entities.Order
        {
            Name = order.Name,
            Email = order.Email,
            Phone = order.Phone,
            CakeType = order.CakeType,
            CakeSize = order.CakeSize,
            CakeFlavor = order.CakeFlavor,
            FrostingFlavor = order.FrostingFlavor,
            DateNeeded = order.DateNeeded,
            SpecialInstructions = order.SpecialInstructions,
            CreatedAt = DateTime.UtcNow
        };

        await _orderRepository.AddOrderAsync(entity);
    }
}
