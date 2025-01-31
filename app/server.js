import dotenv from 'dotenv';
import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import path from 'path'; 
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.router.js'; 
import userRouter from './routes/user.router.js'; 
import postRouter from './routes/post.router.js'; 
import { authenticateToken } from './routes/auth.middleware.js';
import morgan from 'morgan';

dotenv.config()
const SERVER_PORT = parseInt(process.env.SERVER_PORT) || 8081; 
const app = express(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const distDir = path.join(__dirname, 'public/browser/'); 

app.use(express.json()); 
app.use(express.static(distDir));  
app.use(cors());
app.use(morgan('combined'));  

app.use('/api/auth', authRouter); 
app.use('/api/users', userRouter); 
app.use('/api/posts', postRouter); 

mongoose.connect(process.env.MONGODB_URI); 

app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
}); 

app.post('/api/me', authenticateToken, async (req, res) => {
    res.status(200).json({message: "User is logged and authenticated"}); 
}); 

app.listen(SERVER_PORT, () => {
    console.log(`Started listening on http://localhost:${SERVER_PORT}`); 
});
