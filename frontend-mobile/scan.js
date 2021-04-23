let stream = null;
let snapshotData = null;
let aiResponse = null;
let device_idx = 0;

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

$('#capture').addEventListener('click', async () => {
    // TODO: Make sure the button isn't clicked twice
    let video = $('#bag-video');
    video.play();
    video.pause();
    let canvas = document.createElement('canvas');
    var scalefactor = parseFloat($("#zoom-range").value);
    canvas.width = video.videoWidth / scalefactor;
    canvas.height = video.videoHeight / scalefactor;
    var sourceX = (video.videoWidth - canvas.width) / 2;
    var sourceY = (video.videoHeight - canvas.height) / 2;
    var sourceW = canvas.width;
    var sourceH = canvas.height;
    var destX = 0;
    var destY = 0;
    var destW = canvas.width;
    var destH = canvas.height;
    canvas.getContext('2d').drawImage(video, sourceX, sourceX,
                                             sourceW, sourceH,
                                             destX, destY,
                                             destW, destH);
    snapshotData = canvas.toDataURL('image/png'); // base64 encoded data URI
    try {
        aiResponse = null;
        $('#ai-progress').removeAttribute('value');
        $('#ai-progress').removeAttribute('max');
        // We'll figure out the progress bar later, it's probably gonna be hard to implement
        let result = await fetch('https://427sweywdc.execute-api.us-east-2.amazonaws.com/test/process-snapshot', {
            method: 'POST',
            body: JSON.stringify({ snapshot: snapshotData }), // this is an object, not a list
            headers: { 'Content-Type': 'application/json' }
        });
        aiResponse = await result.json();
        // // Hardcoded Way
        // await new Promise(async (resolve) => {
        //     for (let i = 0; i < 5; ++i) {
        //         await sleep(100);
        //         $('#ai-progress').value = Math.floor(((i + 1) / 5) * 100);
        //     }
        //     resolve();
        // });
        // $('#ai-progress').value = 100;
        // aiResponse = {
        //     type: '03',
        //     color: 'BE'
        // };
        $('#bag-type').value = aiResponse.type;
        $('#bag-color').value = aiResponse.color;
        $('#ai-progress').setAttribute('value', 100);
        $('#ai-progress').setAttribute('max', 100);
        alert('Scan complete. Please verify the bag\'s classification and color');
    } catch (e) {
        console.error('failed to process snapshot', e);
        alert('failed to process snapshot');
    }
});

$('#submit').addEventListener('click', async () => {
    if (snapshotData == null) {
        alert('Missing Bag Snapshot');
        return;
    }
    let type = $('#bag-type').value;
    let color = $('#bag-color').value;
    let data = {
        snapshot: snapshotData,
        type,
        color,
        aiType: aiResponse.type,
        aiColor: aiResponse.color
    };
    console.log('submitting scan data', data);
    try {
        let result = await fetch('https://427sweywdc.execute-api.us-east-2.amazonaws.com/test/submit-data', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        let response = await result.json();
        // response = {"aiResponseID": "4254-5139-6923"}
        console.log('got response from submit-data', response);
        alert('Image uploaded, you may now leave this page');
    } catch (e) {
        console.error('unable to get response from submit data', e);
        alert('unable to get response from submit data');
    }
});

async function incrementDevice() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter(
            device => device.kind === "videoinput"
        ).map(x => x.deviceId);
        var constraints = {
            video: {
                deviceId: cameras[device_idx]
            }
        }
        device_idx += 1;
        if(device_idx >= cameras.length) {
            device_idx = 0;
        }
        stream = await navigator.mediaDevices.getUserMedia(constraints);    
        let video = $('#bag-video');
        video.srcObject = stream;
    } catch(err) {
        console.log(err);
    }
}

$('#cycle').addEventListener('click', async () => {
    incrementDevice();
});

function submit() {

}

async function setupVideo() {
    try {
        incrementDevice();
    } catch (err) {
        console.log(err);
        // do error handling later B)
    }
}

document.getElementById("zoom-range").oninput = function(e) {
    $("#bag-video").style["-webkit-transform"] = "scale(" + $("#zoom-range").value + ")";
    $("#bag-video").style["-moz-transform"] = "scale(" + $("#zoom-range").value + ")";
    $("#bag-video").style["-o-transform"] = "scale(" + $("#zoom-range").value + ")";
    $("#bag-video").style["-ms-transform"] = "scale(" + $("#zoom-range").value + ")";
};

setupVideo();

