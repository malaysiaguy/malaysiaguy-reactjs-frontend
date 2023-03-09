const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    },
    firstname: {
        type: String,
        required: [true, 'Please add first name']
    },
    lastname: {
        type: String,
        required: [true, 'Please add last name']
    },
    nric: {
        type: String,
        required: [true, 'Please add identity card number']
    },
    dob: {
        type: Date,
        required: [true, 'Please add date of birth']
    },
    gender: {
        type: String,
        required: [true, 'Please add gender']
    },
    nationality: {
        type: String,
        required: [true, 'Please add nationality']
    },
    marital: {
        type: String,
        required: [true, 'Please add marital status']
    },
    placeofbirth: {
        type: String,
        required: [true, 'Please add place of birth']
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    city: {
        type: String,
        required: [true, 'Please add city']
    },
    states: {
        type: String,
        required: [true, 'Please add states']
    },
    country: {
        type: String,
        required: [true, 'Please add country']
    },
    zipcode: {
        type: String,
        required: [true, 'Please add zipcode']
    },
    contact: {
        type: Number,
        required: [true, 'Please add contact number']
    },
    photo: {
        type: String,
    },
},
{
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//will encrypt password everytime it's saved
/*
userSchema.pre('save', async (next) => {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
*/
module.exports = mongoose.model('User', userSchema)