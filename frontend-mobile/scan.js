async function setupVideo() {
    try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });    
        let video = $('#bag-video');
        video.srcObject = stream;
    } catch (err) {
        console.log(err);
        // do error handling later B)
    }
}

setupVideo();

