import { Request, Response, Router } from "express";

import { validate, saleValidator } from "../../utils/validators";

import { UsersService } from "../users/users.service";
import { SalesService } from "./sales.service";

const salesRouter = Router();
const salesService = new SalesService();

salesRouter.post(
  "/new-sale",
  validate(saleValidator),
  async (req: Request, res: Response) => {
    try {
      const { products_id, qty } = req.body;
      const userId = req.get("Auth");

      const user = UsersService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ ok: false, error: "User not found" });
      } else {
        const newSale = await salesService.createSale(
          userId,
          products_id,
          Number(qty)
        );

        return res.send({
          ok: true,
          message: "Sale created successfully",
          newSale,
        });
      }
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

export default salesRouter;
