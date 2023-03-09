const mongoose = require('mongoose')

const academicSchema = mongoose.Schema(
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
            required: [true, 'Please enter institution name']
        },

        qualification: {
            type: String,
            required: [true, 'Please enter qualification']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Academic', academicSchema)