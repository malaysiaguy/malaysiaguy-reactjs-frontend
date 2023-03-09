const express = require('express')
const router = express.Router()
const {
    getExperienceSummary,
    setExperienceSummary,
    updateExperienceSummary,
    deleteExperienceSummary,
} = require('../controllers/experienceSummaryController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getExperienceSummary).post(protect, setExperienceSummary)
router.route('/:id').delete(protect, deleteExperienceSummary).put(protect, updateExperienceSummary)

module.exports = router
