import { NextFunction, Request, Response } from "express";

export const verifyAuthHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.get("Auth");

  if (!authToken) {
    return res.status(401).json({ error: "Auth header is required!" });
  }

  next();
};
