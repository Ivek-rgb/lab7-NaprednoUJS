import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 

const authRouter = express.Router();
const passwordSaltRounds = 10;  

authRouter.post('/login', async (req, res) => {

    const {username, password} = req.body.payload; 
    let users = undefined;  

    try{
        users = await User.find({username : username}); 
    }catch(error){
        res.status(500).json({message: error.message}); 
        return; 
    }

    if(!users.length){
        res.status(401).json({message: "Invalid username!"}); 
        return; 
    }

    users = users[0].toObject(); 

    const match = await bcrypt.compare(password, users.password); 

    if(!match){
        res.status(401).json({message: "Invalid password!"}); 
        return; 
    }else{
        const {password, createdAt, updatedAt, __v, _id, ...shearedUser} = users; 
        shearedUser.id = _id.toString(); 
        const accessToken = jwt.sign(shearedUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h"}); 
        res.status(200).json({user : shearedUser, token : accessToken}); 
    }

}); 

authRouter.post('/register', async (req, res) => {

    const tmpUserContainer = req.body.payload;
    let users = undefined;     

    try{
        users = await User.find({username : tmpUserContainer.username}); 
    }catch(error){
        res.status(500).json({message: error.message}); 
        return; 
    }

    if(users.length){
        res.status(403).json({message: "Username already in use!"})
        return; 
    }
    
    tmpUserContainer.password = await hashPassword(tmpUserContainer.password, passwordSaltRounds);  
    
    const user = new User({
        ...tmpUserContainer
    }); 

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);  
    }catch(error){
        res.status(400).json({message: error.message}); 
    }
    
}); 

async function hashPassword(plainPass, saltRounds){
    return await bcrypt.hash(plainPass, saltRounds); 
}

export default authRouter; 