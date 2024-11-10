const AuthRouter = require("express").Router();
const { UserModel } = require('../model/User.model');

/**
 * CREATE ACCOUNT
 */
AuthRouter.post("/signup", async (request, response) => {
    // Check for email
    if (!request.body.email) {
        return response.status(400).json({
            success: false,
            message: "Email is missing"
        });
    }
    // ACcount already exists
    const matchingUser = await UserModel.findOne({ email: request.body.email });
    if (matchingUser) {
        return response.status(409).json({
            message: "Account already exists",
            success: false,
        })
    } else {
        const newUser = new UserModel(request.body);
        newUser.save().then((result) => {
            if(result && result._id) {
                return response.status(201).json({
                    message: "Account created successfully",
                    success: true,
                })
            } else {
                return response.status(500).json({
                    message: "Internal server error",
                    success: false,
                })
            }
        }).catch((error) => {
            return response.status(400).json({
                message: "Something went wrong",
                error: error.message,
                success: false,
            });
        })
    }
});

/**
 * SIGNIN USER 
 */
AuthRouter.post("/signin", async (request, response) => {
    const EMAIL = request.body.email;
    const PASSWORD = request.body.password;
    if (!EMAIL || !PASSWORD) {
        return response.status(400).json({
            message: "Bad credentials",
            success: false,
        });
    } else {
        const matchingUser = await UserModel.findOne({ email: EMAIL });
        if(matchingUser && matchingUser._id) {
            if (PASSWORD === matchingUser.password) {
                return response.status(200).json({
                    message: "Signin successful!",
                    success: true,
                });     
            } else {
                return response.status(400).json({
                    message: "Bad credentials",
                    success: false,
                });
            }
        } else {
            return response.status(404).json({
                message: "Account doesn't exists!",
                success: false,
            }); 
        }
    }
});

module.exports = AuthRouter;