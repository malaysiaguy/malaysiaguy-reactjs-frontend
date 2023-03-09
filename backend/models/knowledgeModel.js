const mongoose = require('mongoose')

const knowledgeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        knowledge: {
            type: String,
            required: [true, 'Please enter knowledge description']
        },

        knowledgeType: {
            type: String,
            required: [true, 'Please enter knowledge type']
        },

        level: {
            type: String,
            required: [true, 'Please enter level of proficiency']
        },
    },
    {
            timestamps: true
    }
)

module.exports  = mongoose.model('Knowledge', knowledgeSchema)