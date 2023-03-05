import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true } })

//verificar a data de expiração
CouponSchema.virtual('isExpired').get(function(){
    
    //comparar data final com a data atual - retorna boolean
    return this.endDate < Date.now()
})

CouponSchema.virtual('daysLeft').get(function(){

    const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 *24 )) + ' days left';

    return daysLeft;

})

//validações
CouponSchema.pre('validate', function(next){
    
    if(this.endDate < this.startDate){
        next(new Error('End date cannot be less than the start date'));
    }
    next();
});

CouponSchema.pre('validate', function(next){
    
    if(this.startDate < Date.now()){
        next(new Error('Start date cannot be less than the atual date'));
    }
    next();
});

CouponSchema.pre('validate', function(next){
    
    if(this.endDate < Date.now()){
        next(new Error('End date cannot be less than the atual date'));
    }
    next();
});

CouponSchema.pre('validate', function(next){

    if(this.discount <= 0 || this.discount > 100){
        next(new Error('Discount cannot be less than 0 or great than 100'));
    }
    next();
});

const Coupon = mongoose.model('Coupon', CouponSchema);

export default Coupon;