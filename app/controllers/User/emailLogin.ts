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
import { match_password } from "../../helpers/match_password";
import jwt from "jsonwebtoken";

export const emailLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(https_status_code.bad_request)
      .json(InputErrorResponse(errors.array()));
  }
  const { username_email, password } = req.body;
  try {
    let user_email = await User.findOne({
      where: { email: username_email, isDeleted: false },
    });

    let user_username = await User.findOne({
      where: { username: username_email, isDeleted: false },
    });

    let assigned_user: any;

    // validate duplicate email
    if (!user_email && !user_username) {
      return res
        .status(https_status_code.bad_request)
        .json(ErrorResponse("Invalid Credentials"));
    } else {
      if (user_email) {
        assigned_user = user_email;
      } else {
        assigned_user = user_username;
      }
    }

    let isMatch = await match_password(assigned_user.password, password);

    // error if no password match
    if (!isMatch) {
      return res
        .status(https_status_code.bad_request)
        .json(ErrorResponse("Invalid Credentials"));
    }

    // if (!assigned_user?.email_verified) {
    //   return res
    //     .status(https_status_code.bad_request)
    //     .json(ErrorResponse("Verify email to login"));
    // }

    if (assigned_user !== undefined) {
      delete assigned_user!.password;
    }

    // generate jwt token using user details after successfull login
    jwt.sign(
      { id: assigned_user?.id },
      process.env.JWT_SECRET,
      (err: any, token: string) => {
        if (err) return ErrorResponse(err);

        return res.status(https_status_code.ok).json(
          SuccessResponse("Login Successfull", {
            token,
            user_info: assigned_user,
          })
        );
      }
    );
  } catch (error) {
    console.log(error);
    return ServerErrorResponse(error.message);
  }
};
