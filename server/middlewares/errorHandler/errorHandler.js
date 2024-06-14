module.exports = function errorHandler(error, request, response, next) {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "InvalidInput":
      status = 400;
      message = "Email/password is required";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "InvalidUser":
      status = 401;
      message = "Email/Password is not match";
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthorized";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Data not found";
      break;
    case "InvalidLogin":
      status = 401;
      message = "Invalid login";
      break;
    case "EmailEmpty":
      status = 400;
      message = "Email cannot be empty";
      break;
    case "PasswordEmpty":
      status = 400;
      message = "Password cannot be empty";
      break;
  }
  response.status(status).json({
    message,
  });
};
