  
import mongoose from 'mongoose';

//define user schema
const userSchema = new mongoose.Schema({
    uid: { type: String, reguired: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    avatar : { type: Blob, required: false},
    secret_question: { type: String, required: true},
    isSeller: { type: Boolean, required: true, default: false },
    balance: { type: Number, required: true, default: 0 }
});

//Create model
const userModel = mongoose.model('User', userSchema);

export default userModel;