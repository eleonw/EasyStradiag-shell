`use strict`;

require('webrtc-adapter');
var $ = require('jquery');

const PORT_NO = 8081;


var video = document.querySelector('#unity-video');
var remoteStream = new MediaStream();
video.srcObject = remoteStream;
var dataChannel;
var pc;

pc = new RTCPeerConnection();
pc.ontrack = e => {
    console.log('OnTrack event: ', e)
    remoteStream.addTrack(e.track);
}
pc.ondatachannel = e => {
    console.log("Ondatachannel event: ", e);
    console.log(dataChannel);
    // dataChannel = e.channel;
    dataChannel.onmessage = onMessage;
    dataChannel.send("Data channel established.");
    console.log(dataChannel);
}
pc.oniceconnectionstatechange = e => {
    let state = e.target.connectionState;
    console.log("IceConnection state changed: ", state);
    if (state === 'connected') {
        ws.close();
        console.log('-'*30);
        console.log("Signaling complete, close webSocket");
        console.log('-'*30);
    }
}

var dataElements = {
    left: {
        origin: $("#left-origin"),
        direction: $('#left-direction')
    },
    right: {
        origin: $('#right-origin'),
        direction: $('#right-direction')
    },
    focusPoint: $('#focus-point'),
    targetAngularPosition: $('#target-angular-position'),
    expectedDirection: $('#expected-direction'),
    strabismusDegree: $('#strabismus-degree'),
    hit: $('hit')
}

function changeText(element, text) {
    element.text(text);
}

let figureData = {degree: [], theta: []};

function clearFigureData() {
    figureData = {degree: [], theta: []};
}

function onMessage(msg) {

    console.log("receive message through WebRTC from Unity: ", msg);
    let data = JSON.parse(msg.data);
    console.log(data)

    let eles = dataElements;
    changeText(eles.targetAngularPosition, data.targetAngularPosition + '°');
    if (data.hit) {
        eles.hit.css('background-color', '#00ff00');
        changeText(eles.left.origin, data.leftOrigin);
        changeText(eles.left.direction, data.leftDirection);
        changeText(eles.right.origin, data.rightOrigin);
        changeText(eles.right.direction, data.rightDirection);
        changeText(eles.focusPoint, data.focusPoint);
        changeText(eles.expectedDirection, data.expectedDirection);
        changeText(eles.strabismusDegree, data.strabismusDegree + '°');

        let angularPos = Number(data.targetAngularPosition);
        let degree = Number(data.strabismusDegree);

        figureData.degree.push(degree);
        figureData.theta.push(angularPos);

    } else {
        eles.hit.css('background-color', '#ff0000');
    }
}

function enableInput() {
    $('#angle').removeAttr('readonly');
    $('#distance').removeAttr('readonly');
    $('#speed').removeAttr('readonly');
    $("#input[name='eye']").removeAttr('readonly');
}

function disableInput() {
    $('#angle').attr('readonly', 'readonly');
    $('#distance').attr('readonly', 'readonly');
    $('#speed').attr('readonly', 'readonly');
    $("input[name='eye']").attr('readonly', 'readonly');
};

$('#start').on('click', () => {

    clearFigureData();
    plotFigure(figureData);
    let controlData = {
        controlNo: 0,
        angle: Number($('#angle').val()),
        distance: Number($('#distance').val()),
        speed: Number($('#speed').val()),
        eye: Number($("input[name='eye']:checked").val())
    };

    console.log(controlData);
    dataChannel.send(JSON.stringify(controlData));
    disableInput();
})

$('#pause').on('click', () => {
    let controlData = {
        controlNo: 1,
    };
    dataChannel.send(JSON.stringify(controlData));

    plotFigure(figureData);
})

$('#stop').on('click', () => {
    let controlData = {
        controlNo: 2,
    };
    dataChannel.send(JSON.stringify(controlData));
    $('#angle').val('');
    $('#distance').val('');
    $('#speed').val('');
    $("input[name='eye']").removeAttr('checked');
    enableInput();
    clearFigureData();
})

clearFigureData();




