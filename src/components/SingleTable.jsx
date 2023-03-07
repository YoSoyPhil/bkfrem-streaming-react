import { useEffect, useLayoutEffect, useState } from "react"
import ReactPlayer from "react-player"
import useWindowSize from "../hooks/useWindowSize"

export default function SingleTable({ activeTables }) {
  const [idle, setIdle] = useState(true)
  const size = useWindowSize()
  const [playing, setPlaying] = useState(false)
  const [playerSize, setPlayerSize] = useState({ width: 1280, height: 720 })
  const [playerError, setPlayerError] = useState(false)
  const [retryAttempts, setRetryAttempts] = useState(0)

  const activeTablesFirst = activeTables
    .slice()
    .sort((a, b) => a.number - b.number)[0]

  const retryAttempt = () => {
    if (!playerError) return
    retryAttempts < 5
      ? setTimeout(async () => {
          console.log(`ATTEMPT #${retryAttempts}`)
          setRetryAttempts(retryAttempts + 1)
          try {
            const req = await fetch(activeTablesFirst?.url)
            if (req.status === 200) {
              setIdle(false)
              setPlaying(true)
            }
          } catch (err) {
            console.log(err)
          }
        }, 1000)
      : setIdle(true) && setPlaying(false)
  }

  useEffect(() => {
    if (retryAttempts) retryAttempt()
  }, [retryAttempts])

  useEffect(() => {
    retryAttempt()
  }, [playerError])

  useEffect(() => {
    if (!activeTables.length) return
    setPlayerError(false)
    setRetryAttempts(0)
    setIdle(false)
    ReactPlayer.canPlay(activeTablesFirst?.url) && setPlaying(true)
  }, [activeTables])

  useLayoutEffect(() => {
    const playerWidth = size.width > 768 ? (size.width / 100) * 50 : size.width
    const playerHeight = Math.round((playerWidth / 16) * 9)
    setPlayerSize({ width: playerWidth, height: playerHeight })
  }, [size])

  return (
    <div className='flex justify-center md:pt-8 mb-4'>
      <div className='flex flex-col'>
        {idle ? (
          playerError ? (
            <div
              style={{
                width: playerSize.width,
                height: playerSize.height // undgå mindre højde i TV mode
              }}
              className='flex flex-col justify-center items-center shadow-2xl greyscale'
            >
              <span className='text-wp-blue text-xl lg:text-2xl xl:text-4xl'>
                Ingen aktivitet på bord {activeTables[0].number}
              </span>
              <span className='text-sky-700 text-lg lg:text-xl xl:text-2xl'>
                Prøv igen senere eller vælg et andet bord
              </span>
            </div>
          ) : (
            <div
              style={{
                width: playerSize.width,
                height: playerSize.height
              }}
              className='flex justify-center items-center shadow-2xl'
            >
              <div className='flex flex-col items-center gap-4'>
                <span className='text-wp-blue text-xl lg:text-2xl xl:text-4xl'>
                  Velkommen til BK Frem's streaming!
                </span>
                <span className='text-sky-600 text-lg lg:text-xl xl:text-2xl'>
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
                    url={activeTablesFirst?.url}
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
