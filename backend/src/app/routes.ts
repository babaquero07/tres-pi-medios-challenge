import { Router } from "express";
import { verifyAuthHeader } from "../utils/verify-auth-header";
import checkAdminAuthorization from "./auth/check-admin-authorization";

import salesRouter from "./sales/sales.controller";
import usersRouter from "./users/users.controller";
import productsRouter from "./products/products.controller";

export const routes = Router();

routes.use("/sales", salesRouter);
routes.use("/users", verifyAuthHeader, checkAdminAuthorization, usersRouter);
routes.use("/products", productsRouter);

export default routes;
