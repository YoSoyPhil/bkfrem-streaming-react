import { useState, useEffect } from "react"
import { wowzaServer, tables, inactiveVideo } from "./config"
import SingleTable from "./components/SingleTable"
import SingleTableNav from "./components/SingleTableNav"
import MultiTables from "./components/MultiTables"
import MultiTablesNav from "./components/MultiTablesNav"

const tablesFormatted = tables.map(tableNo => {
  const protocol = window.location.protocol
  const ports = { default: 1935, ssl: 1936 }
  const portNumber = protocol === "http:" ? ports.default : ports.ssl
  return {
    table: tableNo,
    type: "hls",
    url: `${protocol}//${wowzaServer}:${portNumber}/live/bord${tableNo}.stream_1080p/tables.m3u8`,
    image: `${protocol}//${wowzaServer}/tavle${tableNo}/bord.jpg`
  }
})

function App() {
  const [activeTables, setActiveTables] = useState([]) // table to view
  const [streamingTables, setStreamingTables] = useState([])
  const [inactiveTables, setInactiveTables] = useState([])
  const [streamingTablesChecked, setStreamingTablesChecked] = useState(false)

  useEffect(() => {
    //document.body.classList.add("bg-wp-blue")
    tablesFormatted.forEach(async table => {
      try {
        const response = await fetch(table.url)
        switch (response.status) {
          case 200:
            setStreamingTables(tables =>
              [...tables, table].filter(
                (value, index) => [...tables, table].indexOf(value) === index
              )
            )
            break
          default:
            setInactiveTables(tables =>
              [...tables, table].filter(
                (value, index) => [...tables, table].indexOf(value) === index
              )
            )
            break
        }
        setStreamingTablesChecked(true)
      } catch (err) {
        console.log(err)
      }
    })
  }, [])

  useEffect(() => {
    console.log(streamingTablesChecked, streamingTables, inactiveVideo)
    if (streamingTablesChecked && streamingTables && inactiveVideo) {
      setActiveTables([{ url: inactiveVideo }])
    }
  }, [streamingTablesChecked])

  useEffect(() => {
    if (activeTables.length) return
    if (!streamingTables) return
    if (streamingTables.length)
      setActiveTables([streamingTables.sort((a, b) => a.table - b.table)[0]])
  }, [streamingTables])

  return (
    <div className='App'>
      {activeTables && activeTables.length <= 1 ? (
        <div className='mx-2 md:mx-32 lg:mx-36'>
          <SingleTable activeTables={activeTables} />
          <SingleTableNav
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
        />
      )}
      <MultiTablesNav
        activeTables={activeTables}
        setActiveTables={setActiveTables}
        streamingTables={streamingTables}
      />
    </div>
  )
}

export default App
