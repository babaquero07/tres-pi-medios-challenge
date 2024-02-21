import { Request, Response, Router } from "express";

import { verifyAuthHeader } from "../../utils/verify-auth-header";
import { validate, productValidator } from "../../utils/validators";

import { UsersService } from "../users/users.service";
import { ProductsService } from "./products.service";

const productsRouter = Router();
const productsService = new ProductsService();

productsRouter.post(
  "/new-product",
  verifyAuthHeader,
  validate(productValidator),
  async (req: Request, res: Response) => {
    try {
      const { name, price, description } = req.body;

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

      const newProduct = await productsService.createProduct(
        name,
        Number(price),
        description
      );

      return res.send({
        ok: true,
        message: "Product created successfully",
        newProduct,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error creating product" });
    }
  }
);

export default productsRouter;
