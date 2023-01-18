exports.connectChannelToDM = require('./Managers/connectionManager').connectChannelToDM;
exports.connectDmToDM = require('./Managers/connectionManager').connectDmToDM;

exports.disconnectChannelToDM = require('./Managers/connectionManager').disconnectChannelToDM;
exports.disconnectDmToDM = require('./Managers/connectionManager').disconnectDmToDM;

exports.isConnectChannelToDM = require('./Managers/connectionManager').isConnectChannelToDM;
exports.isConnectDMToDM = require('./Managers/connectionManager').isConnectDMToDM;

exports.createAllDMS = require('./Managers/connectionManager').createAllDMS;


exports.handleMessage = require('./Managers/messageManager').handleMessage;
