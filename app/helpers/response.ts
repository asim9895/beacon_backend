import { https_status_code } from "./http_status";

export const InputErrorResponse = (errors: any) => {
  return {
    status: https_status_code.bad_request,
    errors,
  };
};

export const ErrorResponse = (message: string) => {
  return {
    status: https_status_code.bad_request,
    errors: [{ msg: message }],
  };
};

export const SuccessResponse = (message: string, body: any) => {
  return {
    status: https_status_code.ok,
    message,
    body,
  };
};

export const ServerErrorResponse = (message: string) => {
  return {
    status: https_status_code.bad_request,
    errors: [{ msg: message }],
  };
};
