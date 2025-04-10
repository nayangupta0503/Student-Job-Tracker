const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['applied', 'interview', 'offer', 'rejected'],
        default: 'applied',
        required: true,
    },
    dateOfApplication: {
        type: Date,
        required: true,
    },
    link: {
        type: String,
        required: true, 
    },  
})

module.exports = mongoose.model('Application', applicationSchema)