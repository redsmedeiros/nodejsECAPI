import mongoose from "mongoose";
const Schema = mongoose.Schema;

//generate random numbers
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase()
const randomNumbers = Math.floor(1000 + Math.random() * 9000)

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            type: Object,
            required: true
        }
    ],
    shippingAddress:{
        type: Object,
        default: randomTxt + randomNumbers
    },
    paymentStatus: {
        type: String,
        default: "Not paid"
    },
    paymentMethod: {
        type: String,
        default: "Not specified"
    },
    currency: {
        type: String,
        default: "Not paid"
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "processing", "shipped", "delivered"]
    },
    deliveredAt:{
        type: Date
    }
}, { timestamps: true })

const Order = mongoose.model("Order", OrderSchema);

export default Order;