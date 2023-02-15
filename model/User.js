import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})