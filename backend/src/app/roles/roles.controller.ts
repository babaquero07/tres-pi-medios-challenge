import { Request, Response, Router } from "express";

import { validate, roleValidator } from "../../utils/validators";

import { RolesService } from "./roles.service";

const rolesRouter = Router();

rolesRouter.post(
  "/new-role",
  validate(roleValidator),
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const newRole = await RolesService.createRole(name);

      return res.send({
        ok: true,
        message: "Role created successfully",
        newRole,
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

export default rolesRouter;
