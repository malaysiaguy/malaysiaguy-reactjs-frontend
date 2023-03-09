const mongoose = require('mongoose')

const skillSummarySchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        skill: {
            type: String,
            required: [true, 'Please enter skill description']
        },

        years: {
            type: String,
            required: [true, 'Please enter years of skill']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('SkillSummary', skillSummarySchema)