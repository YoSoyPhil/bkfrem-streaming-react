import { useState, useEffect } from "react"
import { wowzaServer, tables, noStreamsVideo } from "./config"
import SingleTable from "./components/SingleTable"
import SingleTableNav from "./components/SingleTableNav"
import MultiTables from "./components/MultiTables"
import MultiTablesNav from "./components/MultiTablesNav"

const tablesFormatted = tables.map(tableNo => {
  const protocol = window.location.protocol
  const ports = { default: 1935, ssl: 1936 }
  const portNumber = protocol === "http:" ? ports.default : ports.ssl
  return {
    number: tableNo,
    type: "hls",
    url: `${protocol}//${wowzaServer}:${portNumber}/live/bord${tableNo}.stream_1080p/tables.m3u8`,
    image: `${protocol}//${wowzaServer}/tavle${tableNo}/bord.jpg`
  }
})

function App() {
  const [activeTables, setActiveTables] = useState([]) // tables to view
  const [streamingTables, setStreamingTables] = useState([])
  const [inactiveTables, setInactiveTables] = useState([])
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    tablesFormatted.forEach(async table => {
      try {
        const response = await fetch(table.url)
        response.status === 200
          ? setStreamingTables(current =>
              [...current, table]
                .filter(
                  (value, index) => [...current, table].indexOf(value) === index
                )
                .sort((a, b) => a.table - b.table)
            )
          : setInactiveTables(current =>
              [...current, table]
                .filter(
                  (value, index) => [...current, table].indexOf(value) === index
                )
                .sort((a, b) => a.table - b.table)
            )
      } catch (err) {
        console.log(err)
      }
    })
  }, [])

  useEffect(() => {
    if (streamingTables.length + inactiveTables.length !== tables.length) return
    streamingTables.length
      ? setActiveTables([streamingTables.slice().sort((a, b) => a.number - b.number)[0]])
      : noStreamsVideo && setActiveTables([{ url: noStreamsVideo }])
  }, [streamingTables, inactiveTables])

  return (
    <div className='App'>
      {activeTables && activeTables.length <= 1 ? (
        <div className='mx-2 md:mx-32 lg:mx-36'>
          <SingleTable activeTables={activeTables} />
          <SingleTableNav
            streamingTables={streamingTables}
            tablesFormatted={tablesFormatted}
            activeTables={activeTables}
            setActiveTables={setActiveTables}
            inactiveTables={inactiveTables}
          />
        </div>
      ) : (
        <MultiTables
          activeTables={activeTables}
          setActiveTables={setActiveTables}
          streamingTables={streamingTables}
          isFullscreen={isFullscreen}
        />
      )}
      <MultiTablesNav
        activeTables={activeTables}
        setActiveTables={setActiveTables}
        streamingTables={streamingTables}
        setIsFullscreen={setIsFullscreen}
      />
    </div>
  )
}

export default App
