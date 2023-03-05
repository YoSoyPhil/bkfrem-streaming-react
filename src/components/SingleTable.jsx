import { useEffect, useLayoutEffect, useState } from "react"
import ReactPlayer from "react-player"
import useWindowSize from "../hooks/useWindowSize"

export default function SingleTable({
  activeTables
}) {
  const [idle, setIdle] = useState(true)
  const size = useWindowSize()
  const [playing, setPlaying] = useState(false)
  const [playerSize, setPlayerSize] = useState({ width: 1280, height: 720 })
  const [playerError, setPlayerError] = useState(false)

  const retryAttempt = () => {
    setPlaying(false)
    setTimeout(() => {
      setPlaying(true)
    }, 1000)
  }

  useEffect(() => {
    if (playerError === "hlsError") { 
      setIdle(true)
    } else {
      retryAttempt()
    }
  }, [playerError])

  useEffect(() => {
    if (!activeTables.length) return
    setIdle(false)
    setPlayerError(false)
    ReactPlayer.canPlay(activeTables[0]?.url) && setPlaying(true)
  }, [activeTables])

  useLayoutEffect(() => {
    const playerWidth = (size.width / 100) * 80
    const playerHeight = Math.round((playerWidth / 16) * 9)
    setPlayerSize({ width: playerWidth, height: playerHeight })
  }, [size])

  return (
    <div className='flex justify-center pt-8 mb-4'>
      <div className='flex flex-col'>
        {idle ? (
          playerError === "hlsError" ? (
            <div
              style={{
                width: playerSize.width,
                height: playerSize.height / 2 // undgå mindre højde i TV mode
              }}
              className='bg-slate-900 flex flex-col justify-center items-center shadow-2xl'
            >
              <span className='text-sky-200 text-xl lg:text-2xl xl:text-4xl'>
                Der er desværre ikke aktivitet på bord {activeTables[0].table}
              </span>
              <span className='text-sky-400 text-lg lg:text-xl xl:text-2xl'>
                Prøv igen senere eller vælg et andet bord
              </span>
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
          activeTables.length && (
            <div className='shadow-2xl'>
              <div className='flex justify-center mx-auto'>
                <div className='aspect-video'>
                  <ReactPlayer
                    url={activeTables[0]?.url}
                    playing={playing}
                    playsinline={true}
                    controls={true}
                    muted={true}
                    width={playerSize.width}
                    height={playerSize.height}
                    style={{}}
                    onError={error => setPlayerError(error)}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
