import { body } from "express-validator";

export const register_validation = [
  body("username", "Username is required").not().isEmpty(),
  body("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email must be valid"),
  body("password", "Password is required")
    .not()
    .isEmpty()
    .matches(/\d/)
    .withMessage("Atleast one number is required")
    .matches(/[A-Z]+/)
    .withMessage("Atleast one capital letter is required")
    .matches(/[\W_]+/)
    .withMessage("Atleast one special character is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 to 20 characters"),
];

export const emailLogin_validation = [
  body("username_email", "Username or Email is required").not().isEmpty(),
  body("password", "Password is required").not().isEmpty(),
];
