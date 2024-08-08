import bcrypt from "bcryptjs";
import UserService from "./userService.js";
import { generateAuthToken } from "../../utils/authToken.util.js";
import isObjectId from "../../utils/isValidObjectId.util.js";
import { sendEmail } from "../../configs/sendMail.js";
import jwt from 'jsonwebtoken'
import env from "../../configs/env.js";

const {
    findByEmail,
    findByEmailWithP,
    createUser,
    findById,
    getAllUsers,
    editById,
    findOneByFilter,
    deleteById
} = new UserService();

export default class UserController {
    async createUser(req, res) {
        const { email, name ,password,phone,role} = req.body;

        //checks if another user with email exists
        if (await findByEmail(email)) {
            //sends an error if the email exists
            return res.status(409)
                .send({
                    success: false,
                    message: "Email already exists"
                });
        }
        const validPassword = await bcrypt.hash(password,10);

        //creates a user if the email doesn't exist
        const createdUser = await createUser({
            name,
            email,
            phone,
            role,
            password:validPassword
        });
        const token = generateAuthToken(createdUser);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        return res.status(201)
            .send({
                success: true,
                message: "User created successfully",
                createdUser
            });
    }

    async getUserById(req, res) {
        //checks if the Id passed in is a valid Id
        if (!isObjectId(req.params.userId)) {
            return res.status(404).send({
                success: false,
                message: "Id is not valid"
            });
        }

        //checks if user exists
        const user = await findById(req.params.userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Id doesn not exist"
            });
        }
        return res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user
        });
    }

    async getUsers(req, res) {
        const users = await getAllUsers();
        return res.status(200).send({
            success: true,
            message: "Users fetched successfully",
            users
        });
    }

    async editUserById(req, res) {
        const id = req.params.userId;
        const data = req.body;

        //checks if the Id passed in is a valid Id
        if (!isObjectId(id)) {
            return res.status(404).send({
                success: false,
                message: "Invalid Id"
            });
        }

        //use the id to check if the user exists
        const userToEdit = await findById(id);
        if (!userToEdit) {
            return res.status(404).send({
                success: false,
                message: "Id does not exist"
            })
        }

        //check if email already exist if the email needs to be updated
        if (data.email) {
            const userEmailWithEmail = await findByEmail(data.email)
            if (userEmailWithEmail) {
                if (userEmailWithEmail._id.toString() !== id) {
                    return res.status(403).send({
                        success: false,
                        message: "Email already exist"
                    })
                }
            }
        }

        // hash password if password needs to be updated
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        const updatedUser = await editById(id, data);

        //regenerating token cuz user details was changed
        const token = generateAuthToken(updatedUser);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        return res.status(200).send({
            success: true,
            message: "User updated successfully",
            editedUser: updatedUser
        })
    }

    async deleteById(req, res) {
        const id = req.params.userId;

        //checks if the Id passed in is a valid Id
        if (!isObjectId(id)) {
            return res.status(404).send({
                success: false,
                message: "Invalid Id"
            });
        }

        //check to see if a user with id exists
        const userToDelete = await findById(id);
        //deletes the user if the id exist
        if (userToDelete) {
            const userDeleted = await deleteById(id);
            //A user shouldn't have access to unauthenticated requests if the user deletes his/her account
            res.cookie("token", "", {
                httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000
            });

            if (userDeleted) {
                return res.status(200).send({
                    success: true,
                    message: "User deleted successfully"
                });
            }
        }

        //sends an error if the id doesn't exists
        return res.status(404)
            .send({
                success: false,
                message: "Id does not exist"
            });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const _user = await findByEmailWithP(email);
        if (!_user) {
            return res.status(400)
                .send({
                    success: false,
                    message: "Invalid credentials "
                });
        }

        const validPassword = await bcrypt.compare(password, _user.password);
        if (!validPassword) {
            return res.status(400)
                .send({
                    success: false,
                    message: "Invalid credentials "
                });
        }
        const token = generateAuthToken(_user);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        return res.status(200).send({
            success: true,
            message: "User successfully logged in",
            user: _user
        });
    }

    async logout(req, res) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1
        });
        return res.status(200).send({
            success: true,
            message: "User logged out successfully"
        });
    }

   


async sendResetLink(req, res) {
  const { email } = req.body;

  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email not found',
      });
    }

    const token = [...Array(6)].map(() => Math.floor(Math.random() * 10)).join('');
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    const updatedUser = await editById(user._id, {
      resetToken: token,
      tokenExpiration: expiration,
    });
   let RESETPASSWORDLINK;
    // Send the reset email
    const resetLink = `${RESETPASSWORDLINK}/?token=${token}`;
    const emailData = {
      email: updatedUser.email,
      subject: "Reset Media Hub's password",
      html: `
        <html>
          <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Hello ${updatedUser.email},</h1>
              <p>You recently requested to reset your password for the Media Cue. To reset your password, click the link below:</p>
              <p>${resetLink}</p>
              <p>Please note that this link is temporary and will expire in 1 hour. If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
              <p>If you have any questions or need further assistance, please contact our support team at u.ali@genesystechhub.com.</p>
              <p>Best regards,</p>
              <p>The Cue Team.</p>
            </div>
          </body>
        </html>
      `,
    };

    await sendEmail(emailData);
    console.log('Reset link sent successfully');

    return res.status(200).send({
      success: true,
      message: 'Reset link sent successfully',
    });
  } catch (error) {
    console.error('Error sending reset link:', error);
    return res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

    async resetPassword(req, res) {
        const token = req.params.token;
        console.log(token)
        const user = await findOneByFilter({
            email: req.body.email,
            resetToken: token,
            // tokenExpiration: {
            //     $gte: Date.now()
            // }
        })
        console.log("reste pass",user)
        if (!user) {
            return res.status(404)
                .send({
                    success: false,
                    message: "Invalid token"
                });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const updatedUser = await editById(String(user._id), { password: hashedPassword });

        // Generate JWT token
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        }, env.jwt_key, { expiresIn: (7 * 24 * 60 * 60) });

        // only return the needed fields of user
        res.cookie('token', jwtToken, { httpOnly: true, maxAge: (7 * 24 * 60 * 60 * 1000) }).status(200).send({
            message: 'Password reset successfully',
            success: true,
            data: updatedUser
        });
    }
}