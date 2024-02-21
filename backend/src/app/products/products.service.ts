import prisma from "../../lib/prisma";

export class ProductsService {
  async createProduct(name: string, price: number, description: string) {
    try {
      const newProduct = await prisma.products.create({
        data: {
          name,
          price,
          description,
        },
      });

      return newProduct;
    } catch (error) {
      console.log(error);

      throw new Error("Error creating product");
    }
  }
}
