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
      const user = await UsersService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ ok: false, error: "User not found" });
      }

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
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

salesRouter.put(
  "/update-sale/:saleId",
  validate(saleValidator),
  async (req: Request, res: Response) => {
    try {
      const { saleId } = req.params;
      if (!saleId) {
        return res
          .status(400)
          .json({ ok: false, error: "saleId is required!" });
      }

      const { products_id, qty } = req.body;

      const userId = req.get("Auth");
      const user = await UsersService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ ok: false, error: "User not found" });
      }

      if (user.Roles.name !== "admin") {
        return res.status(403).json({
          ok: false,
          error: "You are not authorized to perform this action",
        });
      }

      const updatedSale = await salesService.updateSale(
        saleId,
        products_id,
        Number(qty)
      );

      return res.send({
        ok: true,
        message: "Sale updated successfully",
        updatedSale,
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

export default salesRouter;
