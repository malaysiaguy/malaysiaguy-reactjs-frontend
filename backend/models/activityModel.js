const mongoose = require('mongoose')

const activitySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        years: {
            type: String,
            required: [true, 'Please enter year']
        },

        activityType: {
            type: String,
            required: [true, 'Please enter activity type']
        },

        details: {
            type: String,
            required: [true, 'Please enter activity details']
        },

        location: {
            type: String,
            required: [true, 'Please enter activity location']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Activity', activitySchema)