const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: 'https://iconarchive.com/download/i109929/Flat-Design-Icons/User-Avatar-2.ico'
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema);    
module.exports = User;