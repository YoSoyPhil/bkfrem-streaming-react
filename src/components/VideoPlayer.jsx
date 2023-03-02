import React, { useEffect, useLayoutEffect, useState } from "react"
import JWPlayer from "@jwplayer/jwplayer-react"
import useWindowSize from "../hooks/useWindowSize"
import { jwplayerLib } from "../config"

export default function VideoGrid({ playlist, activeTable }) {
  const [idle, setIdle] = useState(true)
  const [error, setError] = useState(null)
  const size = useWindowSize()
  const [player, setPlayer] = useState()
  const [playerSize, setPlayerSize] = useState({ width: 1280, height: 720 })

  const configDefaults = {
    width: playerSize.width,
    height: Math.round((playerSize.width / 16) * 9)
  }

  const onError = error => {
    setError(error)
    setIdle(true)
  }

  useLayoutEffect(() => {
    const playerWidth = (size.width / 100) * 80
    const playerHeight = Math.round((playerWidth / 16) * 9)
    player?.resize(playerWidth, playerHeight)
    setPlayerSize({ width: playerWidth, height: playerHeight })
  }, [size])

  useEffect(() => {
    if (!activeTable) return
    setError()
    setIdle(false)
  }, [activeTable])

  return (
    <div className='flex justify-center pt-8 mb-4'>
      <div className='flex flex-col'>
        {idle ? (
          error ? (
            <div
              style={{
                width: playerSize.width,
                height: playerSize.height
              }}
              className='bg-slate-900 flex flex-col justify-center items-center shadow-2xl'
            >
              <span className='text-sky-200 text-xl lg:text-2xl xl:text-4xl'>
                Der er desværre ikke aktivitet på bord {activeTable}
              </span>
              <span className='text-sky-400 text-lg lg:text-xl xl:text-2xl'>
                Prøv igen senere eller vælg et andet bord
              </span>
              <p className='text-slate-900 hidden md:flex md:mt-24'>{`${error?.code}: ${error?.message}`}</p>
            </div>
          ) : (
            <div
              style={{
                width: playerSize.width,
                height: playerSize.height / 2
              }}
              className='bg-slate-900 flex justify-center items-center shadow-2xl'
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
          )
        ) : (
          activeTable > 0 &&
          !error && (
            <div className='shadow-2xl'>
              <JWPlayer
                config={configDefaults}
                library={jwplayerLib}
                autostart={true}
                playlist={playlist}
                onError={e => onError(e)}
                didMountCallback={e => {
                  setPlayer(e.player)
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}
