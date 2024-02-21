import { Request, Response, NextFunction, Router } from "express";

import { validate, userValidator } from "../../utils/validators";

import { UsersService } from "./users.service";

const usersRouter = Router();

usersRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User id is required" });
    }

    const user = await UsersService.getUserById(userId);

    return user
      ? res.send({ ok: true, user })
      : res.status(404).json({ ok: false, error: "User not found" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

usersRouter.post(
  "/new-user",
  validate(userValidator),
  async (req: Request, res: Response) => {
    try {
      const { roles_id, name, last_name, document } = req.body;

      const newUser = await UsersService.createUser(
        roles_id,
        name,
        last_name,
        document
      );

      return res.send({
        ok: true,
        message: "User created successfully",
        newUser,
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ ok: false, error: "Internal server error" });
    }
  }
);

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersService.getAllUsers();

    return res.send({ ok: true, users });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
});

export default usersRouter;
