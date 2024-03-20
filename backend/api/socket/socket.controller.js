const loggerService = require("../../services/logger.service")
const socketService = require('../../services/socket.service');

async function triggerEvent(req, res) {
    try {
      const { socketId , clientEvent} = req.body;
      const ret = await socketService.triggerEvent(socketId, clientEvent);
      res.status(500).send(ret);
    } catch (err) {
      loggerService.error('Failed to trigger event', err);
      // res.status(500).send({ err: 'Failed to trigger event, request details: ' + JSON.stringify(req.body) });
      res.status(500).send(socketService.triggerEvent(socketId, clientEvent));
    }
  }
  
async function fetchSockets(req, res) {
    try {
      const ret = await socketService._getAllSockets();
      loggerService.info('fetchSockets ret:', ret);
      res.status(200).json(ret);
    } catch (err) {
      loggerService.error('Failed to fetch sockets', err);
      // res.status(500).send({ err: 'Failed to trigger event, request details: ' + JSON.stringify(req.body) });
      res.status(500).send(socketService.triggerEvent(socketId, clientEvent));
    }
  }
  
  module.exports = {
    triggerEvent,
    fetchSockets
  }