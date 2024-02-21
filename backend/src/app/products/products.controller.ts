import { Request, Response, Router } from "express";

import { verifyAuthHeader } from "../../utils/verify-auth-header";
import { validate, productValidator } from "../../utils/validators";

import { ProductsService } from "./products.service";
import checkAdminAuthorization from "../auth/check-admin-authorization";

const productsRouter = Router();
const productsService = new ProductsService();

productsRouter.post(
  "/new-product",
  verifyAuthHeader,
  checkAdminAuthorization,
  validate(productValidator),
  async (req: Request, res: Response) => {
    try {
      const { name, price, description } = req.body;
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

productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts();

    if (!products)
      return res.status(404).json({ ok: false, error: "No products found" });

    return res.send({ ok: true, products });
  } catch (error) {
    console.log(error);

    res.status(500).json({ ok: false, error: "Error getting products" });
  }
});

export default productsRouter;
