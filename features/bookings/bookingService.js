
import User from "./userModel.js";

export default class UserService {
    async findByEmail(email) {
        return await User.findOne({ email: email }, "-__v -password");
    }

    }

   


