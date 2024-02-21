import { Request, Response, Router } from "express";

import { verifyAuthHeader } from "../../utils/verify-auth-header";
import checkAdminAuthorization from "../auth/check-admin-authorization";
import { validate, saleValidator } from "../../utils/validators";

import { UsersService } from "../users/users.service";
import { SalesService } from "./sales.service";

const salesRouter = Router();
const salesService = new SalesService();

salesRouter.post(
  "/new-sale",
  verifyAuthHeader,
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
  "/:saleId",
  verifyAuthHeader,
  checkAdminAuthorization,
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

salesRouter.delete(
  "/:saleId",
  verifyAuthHeader,
  checkAdminAuthorization,
  async (req: Request, res: Response) => {
    try {
      const { saleId } = req.params;
      if (!saleId) {
        return res
          .status(400)
          .json({ ok: false, error: "saleId is required!" });
      }

      await salesService.deleteSale(saleId);

      return res.send({
        ok: true,
        message: "Sale deleted successfully",
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

salesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const sales = await salesService.getSales();

    if (!sales) {
      return res.status(404).json({ ok: false, error: "Sales not found" });
    }

    return res.send({ ok: true, sales });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

salesRouter.get(
  "/daily-report",
  verifyAuthHeader,
  checkAdminAuthorization,
  async (req: Request, res: Response) => {
    try {
      const report = await salesService.getSalesReportByDay();

      return res.send({ ok: true, report });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

salesRouter.get(
  "/monthly-report",
  verifyAuthHeader,
  checkAdminAuthorization,
  async (req: Request, res: Response) => {
    try {
      const report = await salesService.getSalesReportByMonth();

      return res.send({ ok: true, report });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

export default salesRouter;
