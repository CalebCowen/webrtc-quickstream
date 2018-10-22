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

const getWebRTCVideoElement = (video, height=window.innerHeight, width=window.innerWidth) => {
  let isIOS = navigator.userAgent.includes('Safari')
  let promise = isIOS ? getWebRTCStream() : getWebRTCStream({video: {height, width}})
  promise.then((stream) => {
    video.srcObject = stream
    if (isIOS) {
      video.height = height
      video.width = width
      video.playsinline = true
    }
  })
  return promise
}

const getWebRTCStream = (constraints={video: true, audio: true}) => {
  return navigator.mediaDevices.getUserMedia(constraints)
}

module.exports = {
  getWebRTCStream,
  getWebRTCVideoElement
}
