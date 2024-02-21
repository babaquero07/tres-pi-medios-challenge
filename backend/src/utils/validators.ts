import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({ errors: errors.array() });
  };
};

export const saleValidator = [
  body("products_id")
    .notEmpty()
    .withMessage("pruducts_id is required")
    .trim()
    .isString(),
  body("qty").notEmpty().withMessage("qty is required").trim().isNumeric(),
];

export const productValidator = [
  body("name").notEmpty().withMessage("name is required").trim().isString(),
  body("price").notEmpty().withMessage("price is required").trim().isNumeric(),
  body("description").notEmpty().withMessage("description is required").trim(),
];
