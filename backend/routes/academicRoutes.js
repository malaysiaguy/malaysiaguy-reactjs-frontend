const express = require('express')
const router = express.Router()
const {
    getAcademic,
    setAcademic,
    updateAcademic,
    deleteAcademic,
} = require('../controllers/academicController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAcademic).post(protect, setAcademic)
router.route('/:id').delete(protect, deleteAcademic).put(protect, updateAcademic)

module.exports = router
