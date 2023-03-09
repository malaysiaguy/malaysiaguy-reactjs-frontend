const mongoose = require('mongoose')

const courseworkSchema = mongoose.Schema(
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

        name: {
            type: String,
            required: [true, 'Please enter coursework name']
        },

        details: {
            type: String,
            required: [true, 'Please enter coursework details']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Coursework', courseworkSchema)