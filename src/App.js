import { useState, useEffect } from "react"
import VideoPlayer from "./components/VideoPlayer"
import TablesGrid from "./components/TablesGrid"

const wowzaServer = "klubben.bk-frem.dk"
const tables = [1, 2, 3, 4, 5, 7, 8, 9, 10]
const playlist = tables.map(tableNo => {
  return {
    file: `http://${wowzaServer}:1935/live/bord${tableNo}.stream_1080p/playlist.m3u8`,
    image: `http://${wowzaServer}/tavle${tableNo}/bord.jpg`
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
        <div className='flex flex-col items-center'>
          <strong>
            Grundet manglende sikkerhedscertifikat, kan stream kun tilgås pr.
            HTTP forbindelse (ukrypteret)
          </strong>
          <p>
            Forventes udbedret første uge af marts 2023.
            <br />
            <a href='http://bk-frem.dk/streaming'>
              Gå til midlertidig ukrypteret stream
            </a>
          </p>
        </div>
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
