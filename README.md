**WebRTC Quickstream**

WebRTC Quickstream is a package to help create a WebRTC Media Stream and attach it to a video element easily. WebRTC Quickstream handles the various checks that need to be done to run getUserMedia on all browsers.

(Note: WebRTC is not supported on Chrome for iOS)

***Install***

`npm i webrtc-quickstream`

***Usage***

getWebRTCVideoElement:
The code below passes a video element, along with it's height, width, and a boolean argument for audio to the `getWebRTCVideoElement()` function.

Height, width, and audio default to `window.innerHeight`, `window.innerWidth`, and `true` respectively.

WebRTC Quickstream will use the appropriate `getUserMedia()` function for the browser and attach the MediaStream to the video element.

A promise is returned and further modification to the video element or the MediaStream can be made.
```
import React, { Component } from 'react'
import {getWebRTCVideoElement} from 'webrtc-quickstream'

class App extends Component {
  startVideo = () => {
    let video = this.refs.videoTag
    getWebRTCVideoElement(video, window.innerHeight, window.innerWidth, true)
    .then(() => video.hidden = false)
    .catch((e) => this.refs.nativeCamera.click())
  }
  render() {
    return (
      <div>
        <button onClick={this.startVideo}>Start</button>
        <video hidden autoPlay ref="videoTag"/>
        <input
          capture
          type="file"
          hidden
          ref="nativeCamera"
          onClick={(e) => console.log(e.target)}
        />
      </div>
    )
  }
}

export default App
```

getWebRTCStream:

The `getWebRTCStream()` function works much like `getUserMedia()`, but extrapolates the process of finding the correct vendor prefix for the browser away.

Other than that, `getWebRTCStream()` would be called just like `getUserMedia()`, taking an object containing the constraints you wish to place on your MediaStream in it's arguments.

If no constraints are passed in, `getWebRTCStream()` defaults the constraints to `{video: true, audio: true}`

Note that `getWebRTCStream()` only handles the vendor prefixes and returns a promise that resolves to a MediaStream. It does **NOT** handle the specific requirements for playing a video with a MediaStream in the browser. Use `getWebRTCVideoElement()` for this.
```
import React, { Component } from 'react'
import {getWebRTCStream} from 'webrtc-quickstream'

class App extends Component {
  startVideo = () => {
    let video = this.refs.videoTag
    getWebRTCStream({video: true, audio: false})
    .then((stream) => {
      video.srcObject = stream
      video.hidden = false
    })
    .catch((e) => this.refs.nativeCamera.click())
  }
  render() {
    return (
      <div>
        <button onClick={this.startVideo}>Start</button>
        <video hidden autoPlay ref="videoTag"/>
        <input
          capture
          type="file"
          hidden
          ref="nativeCamera"
          onClick={(e) => console.log(e.target)}
        />
      </div>
    )
  }
}

export default App
```
