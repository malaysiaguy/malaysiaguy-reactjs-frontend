const express = require('express')
const router = express.Router()
const {
    getWorks,
    setWork,
    updateWork,
    deleteWork,
} = require('../controllers/workController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getWorks).post(protect, setWork)
router.route('/:id').delete(protect, deleteWork).put(protect, updateWork)

module.exports = router
