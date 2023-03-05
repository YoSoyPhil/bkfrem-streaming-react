import { useState, useEffect } from "react"
import VideoPlayer from "./components/VideoPlayer"
import TablesGrid from "./components/TablesGrid"
import { wowzaServer, tables } from "./config"
import MultiTables from "./components/MultiTables"
import MultiTablesNav from "./components/MultiTablesNav"

const playlist = tables.map(tableNo => {
  const protocol = window.location.protocol
  const ports = { default: 1935, ssl: 1936 }
  const portNumber = protocol === "http:" ? ports.default : ports.ssl
  return {
    table: tableNo,
    type: "hls",
    file: `${protocol}//${wowzaServer}:${portNumber}/live/bord${tableNo}.stream_1080p/playlist.m3u8`,
    image: `${protocol}//${wowzaServer}/tavle${tableNo}/bord.jpg`
  }
})

function App() {
  const [activeTable, setActiveTable] = useState() // table to view
  const [multiTables, setMultiTables] = useState([])
  const [streamingTables, setStreamingTables] = useState([])
  const [inactiveTables, setInactiveTables] = useState([])

  useEffect(() => {
    document.body.classList.add("bg-wp-blue")
    playlist.forEach(async table => {
      try {
        const response = await fetch(table.file)
        switch (response.status) {
          case 200:
            setStreamingTables(tables => [...tables, table])
            break
            default:
              setInactiveTables(tables => [...tables, table])
              break
            }
          } catch (err) {
            console.log(err)
          }
        })
      }, [])

  useEffect(() => {
    if (activeTable) return
    if (!streamingTables) return
    if (streamingTables.length)
      setActiveTable(streamingTables.sort((a, b) => a.table - b.table)[0].table)   
  }, [streamingTables])
      
  return (
    <div className='App'>

      {streamingTables && multiTables && multiTables.length <= 1 ? (
         <div className='mx-2 md:mx-32 lg:mx-36'>
         <>
         <VideoPlayer
         playlist={playlist}
         activeTable={activeTable}
         streamingTables={streamingTables}
         />
         <TablesGrid
         playlist={playlist}
         activeTable={activeTable}
         setActiveTable={setActiveTable}
         />
         </>
         </div>
         ) : (
           <MultiTables playlist={playlist} multiTables={multiTables} streamingTables={streamingTables} />
           )
         }
        
        <MultiTablesNav multiTables={multiTables} setMultiTables={setMultiTables} streamingTables={streamingTables} />
    </div>
  )
}

export default App
