import Product from "../../../../domain/product/entity/product";
import RepositoryInterface from "../../domain/repository/repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements RepositoryInterface<Product> {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        id: entity.id,
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productsFound = await ProductModel.findAll();
    return productsFound.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
