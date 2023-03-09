const mongoose = require('mongoose')

const workSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        industryType: {
            type: String,
            required: [true, 'Please enter industry type']
        },

        workType: {
            type: String,
            required: [true, 'Please enter work type']
        },

        company: {
            type: String,
            required: [true, 'Please enter company name']
        },

        location: {
            type: String,
            required: [true, 'Please enter company location']
        },

        fromDate: {
            type: Date,
            required: [true, 'Please enter from date']
        },

        toDate: {
            type: Date,
            required: [true, 'Please enter to date']
        },

        position: {
            type: String,
            required: [true, 'Please enter job position']
        },

        reasonLeaving: {
            type: String,
            required: [true, 'Please enter reason leaving']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Work', workSchema)