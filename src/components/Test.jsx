import React from "react"
import ReactPlayer from "react-player"

export default function Test() {
  return (
    <div className='flex justify-center mx-auto'>
      <ReactPlayer
        url={"https://klubben.bk-frem.dk:1936/live/bord2.stream_1080p/playlist.m3u8"}
        playing={true}
        controls={true}
        muted={true}
        width='600'
        height='400'
      />
    </div>
  )
}
