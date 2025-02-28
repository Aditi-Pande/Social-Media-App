import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {


    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        
        if(err) {
            return res.status(500).json(err);
        }
        
        // check if already exists
        if(data.length){
            return res.status(409).json("User already exists!");
        }
        
        // create new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q =
        "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name,
        ];

        db.query(q, [values], (err, data) => {

            if(err){
                return res.status(500).json(err);
            }
        
            return res.status(200).json("User has been created successfully.");
        });
    });

}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        
        // server error
        if(err) {
            return res.status(500).json(err);
        }

        // check if user exists or not
        if(data.length === 0){
            return res.status(404).json("No such user!");
        }

        // if user found, verify password
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword){
            return res.status(400).json("Incorrect password or username!");
        }

        const token = jwt.sign({id: data[0].id}, "secretkey")

        // to destructure user info
        const {password, ...others} = data[0];

        res.cookie("accessToken", token, {
            httpOnly:true,
        }).status(200).json(others)

    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
}