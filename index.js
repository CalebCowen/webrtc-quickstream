const quickStream = () => {
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

  const getWebRTCVideoElement = async (height, width, video) => {
    let isIOS = navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')
    let promise = isIOS ? getWebRTCStream() : getWebRTCStream({video: {height, width}})
    promise.then((stream) => {
      video.srcObject = stream
      if (isIOS) {
        video.height = height
        video.width = width
      }
    })
  }

  const getWebRTCStream = async (e, constraints={video: true, audio: true}) => {
    let stream = await navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => stream)
    .catch((err) => err)
    return stream
  }
}

module.exports = quickStream
