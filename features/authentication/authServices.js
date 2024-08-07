import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  InternalServerError,
  InvalidError,
  NotFoundError,
} from "../../lib/appError.js";
import userModel from "../notificationModle.js";
import {
  codeGenerator,
  buildOtpHash,
  verifyOTP,
} from "../../utils/codeGenerator.js";
import env from "../../configs/env.js";
import notificationModel from "../notificationModle.js";
import { sendEmail } from "../../configs/sendMail.js";

export const signUpUser = async ({ body }) => {
  try {

    const existingEmailUser = await userModel.findOne({ email: body.email });
    const existingUsernameUser = await userModel.findOne({
      username: body.username,
    });

    if (existingEmailUser) {
      throw new BadRequestError("Email already exists");
    }

    if (existingUsernameUser) {
      throw new BadRequestError("Username already exists");
    }

    // Hash the password
    const password = await bcrypt.hash(body.password, 12);

    // Save the user to the database
    const data = {
      name: body.username,
      email: body.email,
      phone: body.email,
      password,
      avatar: body.avatar,
    };

    const createUser = await userModel.create(data);
    if (!createUser) {
      throw new InternalServerError("Failed to create user");
    }

    // create notification for member
    await notificationModel.create({
      note: `You have successfully  created a new account`,   
      user_id: createUser._id,
    });
    return { hash, email: body.email };
  } catch (error) {
    console.log(error);
    throw new BadRequestError(
      error.message || "Invalid request. Please check your inputs"
    );
  }
};



export const loginUser = async ({ body }) => {
  const { email, password } = body;

 
  const checkUser = await userModel.findOne({ email });


  if (!checkUser) {
    throw new InvalidError("Invalid Email or password");
  }

  const isMatch = await bcrypt.compare(password, checkUser.password);


  if (!isMatch) {
    throw new InvalidError("Invalid email or Password");
  }

  await checkUser.save();

  // Convert user to JSON
  const user = checkUser.toJSON();

  
  const token = jwt.sign({ ...user }, env.jwt_key);

 
  return { token };
};

export const forgotPassword = async ({ body }) => {
  const { email } = body;
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) throw new NotFoundError("account does not exist");

  const otpCode = await codeGenerator(6, "1234567890");

  // const hashNewPassword = await bcrypt.hash(newPassword, 10);

  const hash = buildOtpHash(email, otpCode, env.otpKey, 15);

  // checkMember.password = hashNewPassword
  checkUser.password = hash;

  checkUser.save();

  // Send OTP email
  const mailData = {
    email: body.email,
    subject: "Password Reset",
    type: "html",
    html: `<p>Your OTP for account Password Reset is: ${otpCode}</p>`,
    text: `Your OTP for account Password Reset is: ${otpCode}`,
  };
  try {
    await sendEmail(mailData);
    console.log("reset OTP sent...");
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Failed to send OTP email");
  }

  // return { email: checkMember.contact.email };
  return { hash: hash, email: body.email };
};

export const resetPassword = async ({ body, email }) => {
  const { code, hash } = body;

  const checkUser = await userModel.findOne({ email });
  if (!checkUser) throw new NotFoundError("account does not exist");

  const verifyOtp = verifyOTP(email, code, hash, env.otpKey);
  if (!verifyOtp) throw new InvalidError("Wrong otp code");
  const password = await bcrypt.hash(body.password, 12);

  checkUser.password = password;
  const randToken = await codeGenerator(4, "1234ABCD");

  //save token inside user
  checkUser.token = randToken;

  await checkUser.save();

  // create notification for member
  await notificationModel.create({
    note: `You have successfully  changed your password`,
    user_id: checkUser._id,
  });

  return true;
};

export const resendOtp = async ({ body }) => {
  const checkUser = await userModel.findOne({ email: body.email });

  if (!checkUser) throw new NotFoundError("User does not exists");
  // Check if OTP is verified
  if (checkUser.isVerified) {
    throw new BadRequestError("Acount already verified");
  }

  const rawOtpCode = await codeGenerator(6, "1234567890");

  const hash = buildOtpHash(body.email, rawOtpCode, env.otpKey, 10);

  checkUser.otpCode = hash;

  checkUser.save();

  // Send OTP email
  const mailData = {
    email: body.email,
    subject: "OTP for Account Verification",
    type: "html",
    html: `<p>Your OTP for account verification is: ${rawOtpCode}</p>`,
    text: `Your OTP for account verification is: ${rawOtpCode}`,
  };

  try {
    await sendEmail(mailData);
    console.log("reset OTP sent...");
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Failed to send OTP email");
  }

  return { hash, email: body.email };
};
