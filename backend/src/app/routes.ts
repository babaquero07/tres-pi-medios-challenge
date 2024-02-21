import { Router } from "express";
import { verifyAuthHeader } from "../utils/verify-auth-header";

import salesRouter from "./sales/sales.controller";
import usersRouter from "./users/users.controller";

export const routes = Router();

routes.use("/sales", verifyAuthHeader, salesRouter);
routes.use("/users", usersRouter);

export default routes;
