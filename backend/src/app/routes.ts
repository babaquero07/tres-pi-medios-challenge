import { Router } from "express";

import salesRouter from "./sales/sales.controller";

export const routes = Router();

routes.use("/sales", salesRouter);

export default routes;
