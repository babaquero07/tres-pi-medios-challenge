import { Request, Response, NextFunction } from "express";

import { UsersService } from "../users/users.service";

const checkAdminAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    try {
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

      next();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal Server Error" });
    }
  }
};

export default checkAdminAuthorization;
