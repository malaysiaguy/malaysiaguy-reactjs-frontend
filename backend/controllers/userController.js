const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//@desc     Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all field')
    }

    //Check if user exists
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(404)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }
//    res.json({ message: 'Register User' })
})

//@desc     Authenticate a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            nric: user.nric,
            dob: user.dob,
            gender: user.gender,
            nationality: user.nationality,
            marital: user.marital,
            placeofbirth: user.placeofbirth,
            address: user.address,
            city: user.city,
            states: user.states,
            country: user.country,
            zipcode: user.zipcode,
            contact: user.contact,
            photo: user.photo,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
//    res.json({ message: 'Login User' })
})

//@desc     Get new user
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
//    res.json({ message: 'User data display' })
    const {
        _id,
        name,
        email,
        firstname,
        lastname,
        nric,
        dob,
        gender,
        nationality,
        marital,
        placeofbirth,
        address,
        city,
        states,
        country,
        zipcode,
        contact,
        photo
    } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        firstname,
        lastname,
        nric,
        dob,
        gender,
        nationality,
        marital,
        placeofbirth,
        address,
        city,
        states,
        country,
        zipcode,
        contact,
        photo,
    })
})

//@desc     Update user profile
//@route    GET /api/users/update
//@access   Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await getMe(req.user.id)
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.nric = req.body.nric || user.nric
        user.dob = req.body.dob || user.dob
        user.gender = req.body.gender || user.gender
        user.nationality = req.body.nationality || user.nationality
        user.marital = req.body.marital || user.marital
        user.placeofbirth = req.body.placeofbirth || user.placeofbirth
        user.address = req.body.address || user.address
        user.city = req.body.city || user.city
        user.states = req.body.states || user.states
        user.country = req.body.country || user.country
        user.zipcode = req.body.zipcode || user.zipcode
        user.contact = req.body.contact || user.contact
        user.photo = req.body.photo || user.photo

        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            nric: updatedUser.nric,
            dob: updatedUser.dob,
            gender: updatedUser.gender,
            nationality: updatedUser.nationality,
            marital: updatedUser.marital,
            placeofbirth: updatedUser.placeofbirth,
            address: updatedUser.address,
            city: updatedUser.city,
            states: updatedUser.states,
            country: updatedUser.country,
            zipcode: updatedUser.zipcode,
            contact: updatedUser.contact,
            photo: updatedUser.photo,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getMe,
}