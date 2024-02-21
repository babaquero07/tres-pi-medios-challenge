import { Router } from "express";

import salesRouter from "./sales/sales.controller";
import usersRouter from "./users/users.controller";
import productsRouter from "./products/products.controller";

export const routes = Router();

routes.use("/sales", salesRouter);
routes.use("/users", usersRouter);
routes.use("/products", productsRouter);

export default routes;
