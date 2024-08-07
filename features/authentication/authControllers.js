import { InternalServerError } from "../../lib/appError.js";
import appResponse from "../../lib/appResponse.js";
import {
  forgotPassword,
  loginUser,
  resendOtp,
  resetPassword,
  signUpUser,
} from "../authentication/authServices.js";

export const signUpHandler = async (req, res,next) => {
  const { body } = req;

  try {
    const user = await signUpUser({ body });
    res.send(appResponse("new user onboarded successfully", user));
  } catch (error) {
    console.log(error);
    next(new InternalServerError("Internal server error"))
  }

};



export const LoginHandler = async (req, res,next) => {
  const { body } = req;
  try {
    const loggedIn = await loginUser({ body });
  res.send(appResponse(`Logged in successfully`, loggedIn));
  } catch (error) {
    console.log(error)
    next(new InternalServerError("Internal server error"),error);
  }
  
};

export const forgotPasswordHandler = async (req, res,next) => {
  const { body } = req;
  try {
    const updatePassword = await forgotPassword({ body });
  res.send(appResponse(`Reset Details successfully`, updatePassword));
  } catch (error) {
    console.log(error)
    next(new InternalServerError("Internal Server error"))
  }
  
};

export const resetPasswordHandler = async (req, res,next) => {
  const { email } = req.query;
  const { body } = req;
 try {
  const updatePassword = await resetPassword({ email, body });
  res.send(appResponse(`Password RESETED successfully`, updatePassword));
 } catch (error) {
  console.log(error);
 next(new InternalServerError("Internal server error"),error);
 }

};

export const resendOtpHandler = async (req, res,next) => {
  const { body } = req;
   try {
    const data = await resendOtp({ body });
    res.send(appResponse(`OTP resent successfully`, data));
   } catch (error) {
    console.log(error)
    next(new InternalServerError("Internal server error"));
   }
};
