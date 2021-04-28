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
    snapshotData = canvas.toDataURL('image/jpeg'); // base64 encoded data URI
    try {
        aiResponse = null;
        
        // Takes 16s in the worst case
        let estimatedTime = 16000;
        let intervals = 100;
        let gotResult = false;
        $('#ai-progress').setAttribute('value', 0);
        (async () => {
            for (let i = 0; i < intervals; ++i) {
                if (gotResult) break;
                $('#ai-progress').setAttribute('value', Math.floor(i * 100 / intervals));
                await sleep(estimatedTime / intervals);
            }
        })();

        // We'll figure out the progress bar later, it's probably gonna be hard to implement
        let result = await fetch('https://427sweywdc.execute-api.us-east-2.amazonaws.com/test/process-snapshot', {
            method: 'POST',
            body: JSON.stringify({ snapshot: snapshotData }), // this is an object, not a list
            headers: { 'Content-Type': 'application/json' }
        });
        // aiResponse = {
        //     type: '03',
        //     color: 'BE'
        // };
        aiResponse = await result.json();
        gotResult = true;
        $('#ai-progress').setAttribute('value', 100);
        $('#bag-type').value = aiResponse.type;
        $('#bag-color').value = aiResponse.color;

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
        aiType: getAIBagCode($('#bag-type').value),
        aiColor: $('#bag-color').value,
        note: $('#bag-note').value,
    };
    console.log('submitting scan data', data);
    try {
        let result = await fetch('https://427sweywdc.execute-api.us-east-2.amazonaws.com/test/submit-data', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        let response = await result.json();
        // response = { "aiResponseID": "4254-5139-6923" }

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

