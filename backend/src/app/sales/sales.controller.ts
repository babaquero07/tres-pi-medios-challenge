import { Request, Response, Router } from "express";

import { validate, saleValidator } from "../../utils/validators";

const salesRouter = Router();

salesRouter.post(
  "/new-sale",
  validate(saleValidator),
  (req: Request, res: Response) => {
    const { products_id, qty } = req.body;
    const userId = req.get("Auth");

    res.send({ userId, products_id, qty });
  }
);

export default salesRouter;
