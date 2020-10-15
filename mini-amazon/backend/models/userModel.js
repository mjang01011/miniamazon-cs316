import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Define user schema
const userSchema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    avatar : { type: String, required: false},
    isAuth: { type: Boolean, required: true, default: false },
    isSeller: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
    balance: { type: Number, required: true, default: 0 }
});

//Create user model
const User = mongoose.model('User', userSchema);

export default User;
