import prisma from "../../lib/prisma";

export class SalesService {
  async createSale(userId: string, products_id: string, qty: number) {
    try {
      const newSale = await prisma.sales.create({
        data: {
          users_id: userId,
          products_id,
          qty,
        },
      });

      return newSale;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating sale");
    }
  }

  async updateSale(saleId: string, products_id: string, qty: number) {
    try {
      const updatedSale = await prisma.sales.update({
        where: {
          id: saleId,
        },
        data: {
          products_id,
          qty,
        },
      });

      return updatedSale;
    } catch (error) {
      console.log(error);

      throw new Error(`Error updating sale with id: ${saleId}`);
    }
  }
}
