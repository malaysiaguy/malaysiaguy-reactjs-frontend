import imageService from '../services/imageService'

const express = require('express')
const router = express.Router()

router.post(
    '/images',
    validateImageType,
    validateImageExtension,
    validateImageObject,
    validate,
    async (res, res, next) =>
        const base64Image = req.body.image
        const imageName = req.body.name
        const type = req.body.type

        let response

        try {
            response = await imageService.upload(imageName, base64Image)
        } catch (err) {
            console.error(`Error uploading image: ${err.message}`)
            return next(new Error(`Error uploading image: ${imageName}`))
        }
        res.send({link: response})
)

module.exports = router