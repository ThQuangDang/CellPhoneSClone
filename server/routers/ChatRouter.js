const express = require('express')
const { getAllConversation, postSaveMessage, getMessageByConversation } = require('../controllers/ChatController.js')

const router = express.Router()

router.get('/', getAllConversation)

router.get('/message', getMessageByConversation);

router.post('/save', postSaveMessage)

module.exports = router