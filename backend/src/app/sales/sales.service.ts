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

  async deleteSale(saleId: string) {
    try {
      await prisma.sales.delete({
        where: {
          id: saleId,
        },
      });
    } catch (error) {
      console.log(error);

      throw new Error(`Error deleting sale with id: ${saleId}`);
    }
  }

  async getSales() {
    try {
      const sales = await prisma.sales.findMany({
        include: {
          Products: true,
          Users: {
            select: {
              name: true,
              last_name: true,

              Roles: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return sales;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting sales");
    }
  }
}
