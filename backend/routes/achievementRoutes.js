const express = require('express')
const router = express.Router()
const {
    getAchievement,
    setAchievement,
    updateAchievement,
    deleteAchievement,
} = require('../controllers/achievementController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAchievement).post(protect, setAchievement)
router.route('/:id').delete(protect, deleteAchievement).put(protect, updateAchievement)

module.exports = router
