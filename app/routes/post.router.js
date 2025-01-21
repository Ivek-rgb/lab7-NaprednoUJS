import express from 'express';
import bcrypt from 'bcrypt'; 
import Post from '../models/post.model.js'; 
import { authenticateToken } from './auth.middleware.js';

const postRouter = express.Router();

// **  ROUTES SECTION  **

postRouter.get('', authenticateToken, async (req, res) => {
    try{
        const posts = await Post.find(req.query);
        let retPosts = posts.map(val => {
            let {createdAt, updatedAt, __v, ...shearedPost} = val._doc; 
            shearedPost._id = shearedPost._id.toString(); 
            return shearedPost; 
        }); 
        res.json(retPosts); 
    }catch(error){
        res.status(500).json({message: error.message}); 
    }
}); 

postRouter.post('', authenticateToken, async (req, res) => {
    const tmpPostContainer = extractPostData(req);
    const post = new Post({
        ...tmpPostContainer
    }); 

    try{
        const newPost = await post.save();
        res.status(201).json(newPost);  
    }catch(error){
        res.status(400).json({message: error.message}); 
    }
    
}); 

postRouter.route('/:id')
          .get(authenticateToken, getPostById, async (req, res) => {
                res.json(res.post); 
          })
          .patch(authenticateToken,   async (req, res) => {
                try{

                    const updatedBody = extractPostData(req); 
                    const options = {new: true}; 
                    
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedBody, options); 
                    res.json(updatedPost); 
                    
                }catch(error){

                    res.status(400).json({message: error.message}); 
                
                }

          })
          .delete(authenticateToken, async (req, res) => {
                try{
                    const deletedPost = await Post.findByIdAndDelete(req.params.id); 
                    res.status(200).json({ message: `Deleted post: ${deletedPost}` });  
                }catch(error){
                    res.status(500).json({messsage: error.message});
                }
            }); 


// **  HANDLER MIDDLEWARE SECTION  **

async function getPostById(req, res, next){

    let post; 
    try{
        post = await Post.findById(req.params.id);
        if(post == null){
            return res.status(404).json({ messsage : "Post not found!"});
        }
    }catch(error){
        return res.status(500).json({ messsage : error.message });
    }

    res.post = post; 
    next();
}


// **  UTILS FUNCTIONS  **

function extractPostData(req){
    return req.body.payload; 
}

export default postRouter; 