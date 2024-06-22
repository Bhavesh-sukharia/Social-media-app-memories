import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const getUserDetails = (token, user) => {
    return {
        token,
        username: user.username,
        userId: user._id,
    };
};

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!(email && password)) {
            throw new Error("All input required");
        }
        
        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });

        if(!existingUser) {
            throw new Error("Email not registered. Please Sign-up.");
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) throw new Error ( "Invalid Credentials." );

        const token = jwt.sign({ id: existingUser._id }, process.env.TOKEN_KEY, { expiresIn: "24h" });

        res.status(200).json( getUserDetails(token, existingUser) );
    }catch (error) {
        res.status(400).json( { error: error.message } );
    }
}

export const signUp = async (req, res) => {
    const { firstName, lastName, userName, email, password, confirmPassword } = req.body;

    try {

        if (!(firstName && lastName && userName && email && password)) {
            throw new Error("All input required");
        }

        const normalizedEmail = email.toLowerCase();

        const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { userName }] });

        if(existingUser) {
            throw new Error("User already exists with this Email or Username.");
        }

        if(password !== confirmPassword) {
            throw new Error("Passwords doesn't match");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, username: userName})
        
        const token = jwt.sign({ id: result._id}, process.env.TOKEN_KEY, { expiresIn: "24h" });

        res.status(200).json( getUserDetails(token, result) );
    }catch (error) {
        res.status(400).json( { error: error.message} );
    }
}