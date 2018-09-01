const appConstant = require('../appConstant');
var appConfig = require('../appConfig');

var functionMap = new Map();

for(let c=1; c<=appConfig.NUMBER_OF_CLIENTS; c++){
    functionMap.set(appConstant.FUNCTION_PREFIX+c+appConstant.FUNCTION_SUFFIX, function(socket) {
        console.log('someone connected to client-'+c);
    
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    
        for(let i=0; i<appConfig.NUMBER_OF_TAG_2; i++) {
            for(let j=0; j<appConfig.NUMBER_OF_TAG_3; j++){
                setTimeout(()=>{
                    emitEventOnSocketNameSpace(socket, 'client_'+c, {'tag2':'A'+i, 'tag3':'B'+j});
                }, (Math.random())*1000);
            }
        }
    });
}

function emitEventOnSocketNameSpace(socket, eventName, data) {
    socket.emit(eventName, data);
}

module.exports = functionMap;