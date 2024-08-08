import { Router } from "express";
const userRouter = Router();
import UserController from './userController.js';
import authenticate from "../../middlewares/auth.middle.js";
import { validateEdit, validateSignIn, validateSignUp } from "../../validator/validator.js";


const {
    createUser,
    getUserById,
    getUsers,
    editUserById,
    deleteById,
    login,
    logout,
    sendResetLink,
    resetPassword
} = new UserController();

//create a user or signup
userRouter.post("/signup", validateSignUp, createUser);

//login a user
userRouter.post("/signin", validateSignIn, login);

//get a user with an id
userRouter.get("/:userId", authenticate, getUserById);

//get users
userRouter.get("/", authenticate, getUsers);

//edit any user details
userRouter.patch("/:userId", authenticate, validateEdit, editUserById);

// delete user
userRouter.delete("/:userId", authenticate, deleteById);
//logout a user or signup
userRouter.post("/logout", authenticate, logout);
//send rest password link
userRouter.put('/forgot-password', sendResetLink);
//reset password
userRouter.put('/reset-password/:token', resetPassword);

export default userRouter;