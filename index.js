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

const getWebRTCVideoElement = async (video, height, width) => {
  let isIOS = navigator.userAgent.includes('Safari')
  let promise = isIOS ? getWebRTCStream() : getWebRTCStream({video: {height, width}})
  await promise.then((stream) => {
    video.srcObject = stream
    if (isIOS) {
      video.height = height
      video.width = width
      video.playsinline = true
    }
  })
  return promise
}

const getWebRTCStream = async (constraints={video: true, audio: true}) => {
  let result = await navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => stream)
  return result
}

module.exports = {
  getWebRTCStream,
  getWebRTCVideoElement
}
