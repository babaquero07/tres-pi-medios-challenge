import { Router } from "express";

import salesRouter from "./sales/sales.controller";
import usersRouter from "./users/users.controller";

export const routes = Router();

routes.use("/sales", salesRouter);
routes.use("/users", usersRouter);

export default routes;
