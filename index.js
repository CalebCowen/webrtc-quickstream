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

const getWebRTCVideoElement = (video, height, width) => {
  let isIOS = navigator.userAgent.includes('Safari')
  let promise = isIOS ? getWebRTCStream() : getWebRTCStream({video: {height, width}})
  promise.then((stream) => {
    video.srcObject = stream
    if (isIOS) {
      video.height = height
      video.width = width
      video.playsinline = true
    }
  }).catch((err) => {
    return new Error(err)
  })
  console.log(err)
}

const getWebRTCStream = async (constraints={video: true, audio: true}) => {
  let result = await navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => stream).catch((err) => new Error(err))
  return result
}

module.exports = {
  getWebRTCStream,
  getWebRTCVideoElement
}
