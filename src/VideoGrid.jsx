import React, { useEffect, useState } from "react"
import JWPlayer from "@jwplayer/jwplayer-react"

const wowzaServer = "klubben.bk-frem.dk"
const jwtplayerLib = "https://cdn.jwplayer.com/libraries/YyGMLFLW.js"

const tables = [1, 2, 3, 4, 5, 7, 8, 9, 10]

const playlist = tables.map(tableNo => {
  return {
    file: `http://${wowzaServer}:1935/live/bord${tableNo}.stream_1080p/playlist.m3u8`,
    image: `http://${wowzaServer}/tavle${tableNo}/bord.jpg`
  }
})

const configDefaults = { width: 1280, height: 720 }


export default function VideoGrid() {
  const [activeTable, setActiveTable] = useState(0)
  const [player, setPlayer] = useState()

  useEffect(() => {
    player?.load(playlist[activeTable - 1])
    player?.playlistItem(0)
  }, [activeTable])

  return (
    <div className="bg-sky-900 h-screen">
      <div className='flex justify-center pt-8'>
        {activeTable > 0 && (
          <JWPlayer
            config={configDefaults}
            library={jwtplayerLib}
            file={playlist[activeTable - 1].file}
            didMountCallback={(e) => {
              setPlayer(e.player)
            }}
          />
        )}
      </div>
      <div className='grid grid-cols-4 gap-8 mx-44 my-8'>
        {playlist.map((video, index) => {
          return (
            activeTable !== index + 1 && (
              <div className='flex flex-col border border-sky-800 bg-sky-900 shadow-lg'>
                <img
                  src={video.image}
                  onClick={() => setActiveTable(index + 1)}
                />
                <span className="mx-auto my-2 text-sky-50 uppercase">Bord {index + 1}</span>
              </div>
            )
          )
        })}
      </div>

    </div>
  )
}
