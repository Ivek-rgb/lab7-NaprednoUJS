import mongoose from 'mongoose'; 

const postSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
    },
    comment : {
        type: String, 
        required: true
    },
    commentDateTime : {
        type: String, 
        required: true
    }
},
{
    timestamps: true
}
); 

const Post = mongoose.model('Post', postSchema);  
export default Post; 