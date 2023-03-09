const express = require('express')
const router = express.Router()
const {
    getSkillSummary,
    setSkillSummary,
    updateSkillSummary,
    deleteSkillSummary,
} = require('../controllers/skillSummaryController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSkillSummary).post(protect, setSkillSummary)
router.route('/:id').delete(protect, deleteSkillSummary).put(protect, updateSkillSummary)

module.exports = router
