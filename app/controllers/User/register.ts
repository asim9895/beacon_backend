import { hashed_password } from "../../helpers/hashed_password";
import { dataSource } from "../../database/postgres";
import User from "../../entities/User";
import { https_status_code } from "../../helpers/http_status";
import {
  ErrorResponse,
  InputErrorResponse,
  ServerErrorResponse,
  SuccessResponse,
} from "../../helpers/response";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(https_status_code.bad_request)
      .json(InputErrorResponse(errors.array()));
  }
  const { username, email, phone_number, password } = req.body;
  try {
    // find if user already exists in db, as email,username and phone number are unique property
    const find_email = await User.findOne({ where: { email } });
    const find_username = await User.findOne({ where: { username } });
    const find_phone_number = await User.findOne({ where: { phone_number } });

    if (find_email) {
      return res
        .status(https_status_code.bad_request)
        .json(ErrorResponse("Email already taken"));
    }

    if (find_username) {
      return res
        .status(https_status_code.bad_request)
        .json(ErrorResponse("Username already taken"));
    }

    if (find_phone_number) {
      return res
        .status(https_status_code.bad_request)
        .json(ErrorResponse("Phone number already in use"));
    }

    // creating new user if all validations passed successfully
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username,
        email,
        phone_number,
        password: await hashed_password(password),
      })
      .execute();

    res
      .status(https_status_code.bad_request)
      .json(SuccessResponse("User registered successfully", null));
  } catch (error) {
    console.log(error);
    return ServerErrorResponse(error.message);
  }
};
