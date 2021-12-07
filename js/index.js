`use strict`;

const PORT_NO = 8081;

var video = document.querySelector('#remote-video');
var ws = require('ws');
var server = new ws.Server({port: PORT_NO});
console.log(`WebSocket listening on port ${PORT_NO}`);

var remoteStream = new MediaStream();
video.srcObject = remoteStream;

const pc = new RTCPeerConnection();

pc.ontrack = e => {
    console.log('OnTrack event: ', e)
    remoteStream.addTrack(e.track);
}

pc.oniceconnectionstatechange = e => {
    console.log("IceConnection state changed: ", e);
}

server.on('connection', ws => {

    function sendMessage(type, data) {
        signalingMessage = {type, data};
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
            sendMessage('offer', offer);
        } catch(e) {
            console.log("Failed to create offer: ", e);
        }
    }

    pc.onicecandidate = evt => {
        if (evt.candidate) {
            console.log('Sending a candidate: ', evt.candidate);
            sendMessage('candidate', evt.candidate);
        }
    }

    console.log('Websocket connected:', ws);
    sendMessage("message", {message: "Hello Unity!"});

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
                pc.addTransceiver('video');
                break;
            default:
                console.log('Unknown message type: ', message.type);
        }

    })
})

