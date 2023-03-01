import React, { useEffect, useLayoutEffect, useState } from "react"
import JWPlayer from "@jwplayer/jwplayer-react"
import useWindowSize from "../hooks/useWindowSize"

const jwtplayerLib = "https://cdn.jwplayer.com/libraries/YyGMLFLW.js"

export default function VideoGrid({ playlist, activeTable }) {
  const [idle, setIdle] = useState(true)
  const size = useWindowSize()
  const [player, setPlayer] = useState()
  const [playerSize, setPlayerSize] = useState({"width": 1280, "height": 720})

  const configDefaults = {
    width: playerSize.width,
    height: Math.round((playerSize.width / 16) * 9)
  }
  
  useLayoutEffect(() => {
    const playerWidth = (size.width / 100) * 80
    const playerHeight = Math.round((playerWidth / 16) * 9)
    player?.resize(playerWidth, playerHeight)
    setPlayerSize({width: playerWidth, height: playerHeight})
  },[size])

  useLayoutEffect(() => {
    if (!activeTable) return
    player?.load(playlist[activeTable - 1])
    player?.playlistItem(0)
    player?.resize(playerSize.width, playerSize.height)
    setIdle(false)
  }, [player, activeTable])

  /**
   * 
   * Lav funktion for 1,2,4 skærme på en gang
   * - lav en popup med valg af antal
   * - efter antal valgt, vælg bord til de enkelte players
   */

  return (
    <div className='flex justify-center pt-8 '>
      {idle ? (
        <div
          style={{
            width: playerSize.width,
            height: playerSize.height
          }}
          className='bg-slate-900 flex justify-center items-center'
        >
          <div className='flex flex-col items-center gap-4'>
            <span className='text-sky-200 text-xl lg:text-2xl xl:text-4xl'>
              Velkommen til Billardklubben Frem's streaming!
            </span>
            <span className='text-sky-400 text-lg lg:text-xl xl:text-2xl'>
              Klik på et bord nedenfor
            </span>
          </div>
        </div>
      ) : (
        activeTable > 0 && (
          <div className='shadow-2xl mb-4'>
            <JWPlayer
              config={configDefaults}
              library={jwtplayerLib}
              playlist={playlist}
              playlistIndex={activeTable - 1}
              didMountCallback={e => {
                setPlayer(e.player)
              }}
            />
          </div>
        )
      )}
    </div>
  )
}
