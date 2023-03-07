import { useEffect, useLayoutEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import ReactPlayer from "react-player"
import Select from "react-select"
import useWindowSize from "../hooks/useWindowSize"

export default function MultiTables({
  activeTables,
  setActiveTables,
  streamingTables
}) {
  const size = useWindowSize()
  const [playerSize, setPlayerSize] = useState()
  const [playerError, setPlayerError] = useState()

  useLayoutEffect(() => {
    const playerWidth = (size.width / 100) * 50
    const playerHeight = Math.round((playerWidth / 16) * 9)
    setPlayerSize({ width: playerWidth, height: playerHeight })
  }, [size])

  const tableOptions = streamingTables
    .slice()
    .sort((a, b) => a.number - b.number)
    .map(table => {
      return { value: table, label: "Bord " + table.number }
    })

  const changeTable = (activeTablesIndex, newTable) => {
    setActiveTables(current => {
      let newActiveTables = [...current]
      newActiveTables[activeTablesIndex] = newTable
      return newActiveTables
    })
  }

  const selectStyles = {
    container: () => ({ backgroundColor: "#084574"}),
    control: () => ({ 
      color: "white",
      backgroundColor: "#084574",
      width: "7rem",
      display: "flex"
    }),
    option: (styles, state) => ({
      ...styles,
      fontWeight: state.isSelected ? "bold" : "normal",
      color: state.isSelected ? "white" : "white",
      backgroundColor: state.isSelected ? "#084574" : "#0d6fba",
      fontSize: state.isSelected ? "0.75rem" : "0.7rem"
    }),
    singleValue: () => ({
      fontSize: "0.8rem",
      color: "white",
      margin: "0.1rem 0.8rem"
    }),
    valueContainer: () => ({
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    }),
  }

  return (
    <div className='flex'>
      <div
        id='multiTables'
        className={`grid grid-cols-2 my-auto justify-items-center items-center h-5/6`}
      >
        {playerSize &&
          activeTables.map((table, index) => (
            <div
              key={`table-${table.number}-${uuidv4()}-video-container`}
              className='relative z-0'
            >
              <ReactPlayer
                url={table.url}
                playing={true}
                playsinline={true}
                controls={true}
                muted={true}
                width={playerSize?.width}
                height={playerSize?.height}
                onError={error => setPlayerError(error)}
                className=''
              />
              <div className='text-lg left-1/2 bottom-8 absolute z-10'>
                <Select
                menuPlacement={'top'}
                  styles={selectStyles}
                  options={tableOptions}
                  defaultValue={tableOptions.find(
                    option => option.value === table
                  )}
                  onChange={e => changeTable(index, e.value)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
