import { useState, useEffect } from "react"
import VideoPlayer from "./components/VideoPlayer"
import TablesGrid from "./components/TablesGrid"

const wowzaServer = "klubben.bk-frem.dk"
const tables = [1, 2, 3, 4, 5, 7, 8, 9, 10]
const playlist = tables.map(tableNo => {
  const protocol = window.location.protocol
  const ports = { default: 1935, ssl: 1936 }
  const portNumber = protocol === "http:" ? ports.default : ports.ssl
  return {
    file: `${protocol}//${wowzaServer}:${portNumber}/live/bord${tableNo}.stream_1080p/playlist.m3u8`,
    image: `${protocol}//${wowzaServer}/tavle${tableNo}/bord.jpg`
  }
})

function App() {
  const [activeTable, setActiveTable] = useState() // table to view

  useEffect(() => {
    document.body.classList.add("bg-wp-blue")
  }, [])

  return (
    <div className='App'>
      <div className='mx-2 md:mx-32 lg:mx-36'>
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