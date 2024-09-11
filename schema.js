const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

const bookingSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    activity:{
        type: String,
        default: 'Camping'
    },
    BookedFor:{
        type: Date,
        min: [Date.now, "booking must be later than today"],
        required:true
    },
    cardNumber:{
        type: String,
        required: true
    },
    expiryDate:{
        type:Date,
        required: true,
        min:[Date.now, 'expired card']
    },
    CVV:{
        type: Number,
        max: 999
    }
},
{collections:'bookings'},

{
timestamps : true
}
)
const bookingModel =  mongoose.model('booking', bookingSchema);

module.exports = bookingModel;
 