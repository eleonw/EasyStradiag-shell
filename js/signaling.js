'use strict';

var ws = new (require('ws').Server)({port: PORT_NO});
console.log(`WebSocket listening on port ${PORT_NO}`);

// Execute core.exe, which is expected to connect the ws once executed
var exec = require('child_process').execFile;
exec('./../core/core.exe', function(err, data) {
    console.log("Execute core.js");
})

ws.on('connection', ws => {
    function sendWSMessage(type, data) {
        let signalingMessage = {type, data};
        ws.send(JSON.stringify(signalingMessage));
        console.log(`Send a(an) ${type} to Unity: `, data);
    }

    pc.onnegotiationneeded = async evt => {
        console.log("On negotiation needed.");
        let opt = {iceRestart: false, offerToReceiveVideo: true, offerToReceiveAudio: false};
        let offer;
        try {
            offer = await pc.createOffer(opt);
            await pc.setLocalDescription(offer);
            sendWSMessage('offer', offer);
        } catch(e) {
            console.log("Fail to create offer: ", e);
        }
    }

    pc.onicecandidate = evt => {
        if (evt.candidate) {
            console.log('Sending a candidate: ', evt.candidate);
            sendWSMessage('candidate', evt.candidate);
        }
    }

    console.log('Websocket connected:', ws);
    sendWSMessage("message", {message: "Hello Unity!"});

    ws.on('message', async message => {
        message = JSON.parse(message);
        switch(message.type) {
            case 'message':
                console.log('Receive a message from Unity: ', message.data.message);
                break;
            case 'answer':
                console.log('Receive an answer from Unity: ', message.data)
                let desc = new RTCSessionDescription(message.data);
                await pc.setRemoteDescription(desc);
                break;
            case 'candidate':
                console.log('Get an ICE candidate from Unity: ', message.data);
                pc.addIceCandidate(new RTCIceCandidate(message.data));
                break;
            case 'start':
                console.log('Start shaking hand.');
                dataChannel = pc.createDataChannel("data");
                pc.addTransceiver('video');
                break;
            default:
                console.log('Unknown message type: ', message.type);
        }
    })
})