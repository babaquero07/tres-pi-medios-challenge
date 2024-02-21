import { Request, Response, Router } from "express";
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

export default usersRouter;
