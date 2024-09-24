import { Sequelize } from "sequelize-typescript";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "customer 1");
    const address = new Address("s1", 1, "123", "c1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "p1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customerId: "1",
      total: 20,
      items: [
        {
          id: "1",
          productId: "p1",
          name: "p1",
          quantity: 2,
          price: 10,
          orderId: "1",
        },
      ],
    });
  });

  it('should update an order', async () => {
    const orderRepository = new OrderRepository();
    await orderRepository.update(null);
  })

  it('should find an order', async () => {
    const orderRepository = new OrderRepository();
    await orderRepository.find('1');
  })

  it('should find all orders', async () => {
    const orderRepository = new OrderRepository();
    await orderRepository.findAll();
  })
});
