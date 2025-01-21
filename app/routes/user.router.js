import express from 'express';
import bcrypt from 'bcrypt'; 
import User from '../models/user.model.js'; 
import { authenticateToken } from './auth.middleware.js';

const userRouter = express.Router();
const passwordSaltRounds = 10; 

// **  ROUTES SECTION  **

userRouter.get('', authenticateToken, async (req, res) => {
    try{
        const users = await User.find(req.query);
        let retUsers = posts.map(val => {
            let {createdAt, updatedAt, __v, ...shearedUser} = val._doc; 
            shearedUser._id = shearedUser._id.toString(); 
            return shearedUser; 
        }); 
        res.json(retUsers); 
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}); 

userRouter.post('', authenticateToken, async (req, res) => {
    const tmpUserContainer = req.body;
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

userRouter.route('/:id')
          .get(authenticateToken, getUserById, async (req, res) => {
                res.json(res.user); 
          })
          .patch(authenticateToken, async (req, res) => {
                try{

                    const updatedBody = extractUserData(req); 
                    const options = {new: true}; 

                    const updatedUser = await User.findByIdAndUpdate(res.params.id, updatedBody, options); 
                    res.json(updatedUser); 
                    
                }catch(error){
                    res.status(400).json({message: error.message}); 
                }
          })
          .delete(authenticateToken, async (req, res) => {
                try{
                    const deletedUser = await User.findByIdAndDelete(req.params.id); 
                    res.status(200).json({ message: `Deleted user: ${deletedUser}` });  
                }catch(error){
                    res.status(500).json({messsage: err.message});
                }
            }); 


// **  HANDLER MIDDLEWARE SECTION  **

async function getUserById(req, res, next){
    let user; 

    try{
        user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({ messsage : "User not found!"});
        }
    }catch(error){
        return res.status(500).json({ messsage : error.message });
    }

    res.user = user; 
    next();
}

// **  ASYNC UTILS FUNCTIONS  **

async function hashPassword(plainPass, saltRounds){
    return await bcrypt.hash(plainPass, saltRounds); 
}

// **  UTILS FUNCTIONS  **

function extractUserData(req){
    return req.body.payload; 
}

export default userRouter; 