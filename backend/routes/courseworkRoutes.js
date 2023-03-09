const express = require('express')
const router = express.Router()
const {
    getCoursework,
    setCoursework,
    updateCoursework,
    deleteCoursework,
} = require('../controllers/courseworkController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCoursework).post(protect, setCoursework)
router.route('/:id').delete(protect, deleteCoursework).put(protect, updateCoursework)

module.exports = router
