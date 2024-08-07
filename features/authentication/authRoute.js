import express from "express";

import {
    LoginHandler,
    forgotPasswordHandler,
    resendOtpHandler,
    resetPasswordHandler,
    signUpHandler,
  } from "../authentication/authControllers.js";
  import Validate from "../../validator/index.js";
  import {
    otpCodeSchema,
    signUpSchema,
    validateForgotPassword,
    validateLoginUserSchema,
    validateResetForgotPassword,
  } from "../../validator/authValidators.js";
const userAuthRoutes = express.Router();
/*
userAuthRoutes.post("/register",signUpHandler)
userAuthRoutes.post("/otp-verification",signUpHandler)
*/

userAuthRoutes.post(
  "/signup",
  Validate(signUpSchema) ,
  signUpHandler);

userAuthRoutes.post(
  "/login",
  Validate(validateLoginUserSchema),
  LoginHandler
);
userAuthRoutes.post(
  "/forgot_password",
  Validate(validateForgotPassword),
  forgotPasswordHandler
);
userAuthRoutes.patch(
  "/reset_password",
  Validate(validateResetForgotPassword),
  resetPasswordHandler
);
userAuthRoutes.post(
  "/resend-otp",
  Validate(validateForgotPassword),
  resendOtpHandler
);
export default userAuthRoutes;
