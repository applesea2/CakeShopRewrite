namespace CakeShop.Service.Order;

public interface IOrderService
{
    Task PlaceOrderAsync(OrderDto order);
}
