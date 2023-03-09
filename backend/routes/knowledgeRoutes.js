const express = require('express')
const router = express.Router()
const {
    getKnowledge,
    setKnowledge,
    updateKnowledge,
    deleteKnowledge,
} = require('../controllers/knowledgeController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getKnowledge).post(protect, setKnowledge)
router.route('/:id').delete(protect, deleteKnowledge).put(protect, updateKnowledge)

module.exports = router
