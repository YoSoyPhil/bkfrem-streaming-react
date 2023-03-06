import { useEffect, useLayoutEffect, useState } from "react"
import ReactPlayer from "react-player"
import useWindowSize from "../hooks/useWindowSize"

export default function MultiTables({
  activeTables
}) {
  const size = useWindowSize()
  const [playerSize, setPlayerSize] = useState()
  const [playerError, setPlayerError] = useState()

  useLayoutEffect(() => {
    const playerWidth = (size.width / 100) * 50
    const playerHeight = Math.round((playerWidth / 16) * 9)
    setPlayerSize({ width: playerWidth, height: playerHeight })
  }, [size])

  return (
    <div>
      <div
        id='multiTables'
        className={`grid grid-cols-2 my-auto justify-items-center h-5/6`}
      >
        {playerSize &&
          activeTables.map(table => (
            <div key={`table-${table.number}-video-container`} className=''>
              <ReactPlayer
                url={table.url}
                playing={true}
                playsinline={true}
                controls={true}
                muted={true}
                width={playerSize?.width}
                height={playerSize?.height}
                style={{}}
                onError={error => setPlayerError(error)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
