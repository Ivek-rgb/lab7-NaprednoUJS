import dotenv from 'dotenv';
import express from 'express'; 
import mongoose from 'mongoose'; 
import crypto from 'crypto'; 
import cors from 'cors'; 
import jwt from 'jsonwebtoken'; 
import path from 'path'; 
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.router.js'; 
import userRouter from './routes/user.router.js'; 
import postRouter from './routes/post.router.js'; 

dotenv.config()
const SERVER_PORT = parseInt(process.env.SERVER_PORT) || 8081; // default port  
const app = express(); 

mongoose.connect(process.env.MONGODB_URI); 

//mongoose.disconnect(); disconnect upon closing of server   

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const distDir = path.join(__dirname, 'public/browser/'); 

app.use(express.json()); 
app.use(express.static(distDir)); // set static folder, will be ../public after last build now just for test  
app.use(cors()); 

app.use('/api/auth', authRouter); 
app.use('/api/users', userRouter); 
app.use('/api/posts', postRouter); 

app.listen(SERVER_PORT, () => {
    console.log(`Started listening on http://localhost:${SERVER_PORT}`); 
});

app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
}); 



