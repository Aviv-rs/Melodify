const express = require('express')
const { triggerEvent, fetchSockets } = require('./socket.controller')
const router = express.Router()

router.post('/trigger', (req, res)=>{
    triggerEvent(req, res);
});

router.get('/fetchSockets', (req, res)=>{
    fetchSockets(req, res);
});


module.exports = router