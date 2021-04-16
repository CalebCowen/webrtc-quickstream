if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = (constraints) => {

    let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
    }

    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject)
    })
  }
}

const getWebRTCVideoElement = (video, height=window.innerHeight, width=window.innerWidth, audio=true) => {
  return getWebRTCStream({video: {height, width}, audio}).then((stream) => {
    video.srcObject = stream
  }).catch((err) => new Error(err))
}

const getWebRTCStream = (constraints={
  video: true,
  audio: true,
  height: window.innerHeight,
  width: window.innerWidth
}) => {
  let promise = navigator.mediaDevices.getUserMedia(constraints)
  promise.catch((err) => new Error(err))
  return promise
}

module.exports = {
  getWebRTCStream,
  getWebRTCVideoElement
}
