var server = require('../bin/www');
var io = require('socket.io')(server);
var functionMap = require('./utility');
const appConstant = require('../appConstant');
var appConfig = require('../appConfig');

console.log('inside socket.io');

for(var i=1; i<=appConfig.NUMBER_OF_CLIENTS; i++) {
    var client_io = createServerSocketNameSpace(appConstant.NAMESPACE_PREFIX+i);
    client_io.on('connection', functionMap.get(appConstant.FUNCTION_PREFIX+i+appConstant.FUNCTION_SUFFIX));
 }

function createServerSocketNameSpace(nameSpace){
    return io.of('/'+nameSpace);
};