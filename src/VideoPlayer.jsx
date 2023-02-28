import React, { useEffect, useState } from "react"
import JWPlayer from "@jwplayer/jwplayer-react"

const jwtplayerLib = "https://cdn.jwplayer.com/libraries/YyGMLFLW.js"

// const playerWidth = window.innerWidth/100*45
// const configDefaults = {
//   width: playerWidth,
//   height: Math.round((playerWidth / 16) * 9)
// }

const playerWidth = window.innerWidth >= 1920 ? 1920 : 1280

const pwidth = () => {
  switch (true) {
    case window.innerWidth <= 1280:
      return 640
    case window.innerWidth < 1920:
      return 1280
    case window.innerWidth >= 2560:
      return 1920
    default:
      break
  }
}

const configDefaults = {
  width: pwidth(),
  height: Math.round((pwidth() / 16) * 9)
}

export default function VideoGrid({ playlist, activeTable }) {
  const [player, setPlayer] = useState()

  useEffect(() => {
    player && player?.load(playlist[activeTable - 1])
    player?.playlistItem(0)
  }, [player, activeTable])

  return (
    <div className='flex justify-center pt-8'>
      {activeTable > 0 && (
        <div className='shadow-lg'>
          <p className='text-sky-100 text-2xl font-light my-2'>
            Live visning af bord {activeTable}
          </p>
          <JWPlayer
            config={configDefaults}
            library={jwtplayerLib}
            file={playlist[activeTable - 1].file}
            didMountCallback={e => {
              setPlayer(e.player)
            }}
          />
        </div>
      )}
    </div>
  )
}
