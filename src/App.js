import { useState,useEffect } from "react"
import VideoPlayer from "./VideoPlayer"
import TablesGrid from "./TablesGrid"

const wowzaServer = "klubben.bk-frem.dk"
const tables = [1, 2, 3, 4, 5, 7, 8, 9, 10]
const playlist = tables.map(tableNo => {
  return {
    file: `http://${wowzaServer}:1935/live/bord${tableNo}.stream_1080p/playlist.m3u8`,
    image: `http://${wowzaServer}/tavle${tableNo}/bord.jpg`
  }
})

function App() {
  const [activeTable, setActiveTable] = useState(1) // table to view
  useEffect(() => {
    document.body.classList.add("bg-sky-50")
    document.body.classList.add("dark:bg-sky-900")
  }, [])
  return (
    <div className='App'>
      <div className='w-2/3 mx-auto'>
        <VideoPlayer playlist={playlist} activeTable={activeTable} />
        <TablesGrid
          playlist={playlist}
          activeTable={activeTable}
          setActiveTable={setActiveTable}
        />
      </div>
    </div>
  )
}

export default App
