import React, { useState, useEffect } from "react"

export default function TablesGrid({ playlist, activeTable, setActiveTable }) {
  const [timestamp, setTimestamp] = useState()

  useEffect(() => {
    // reload images
    const interval = setInterval(() => {
      setTimestamp(Date.now())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`grid grid-cols-1 gap-y-2 md:grid-cols-4 2xl:grid-cols-9 md:gap-8 my-8`}
    >
      {playlist.map(video => {
        const {table,image} = video
        return (
          <a
            href={"#"}
            key={"table-container-" + table + timestamp}
            className={`flex md:flex-col border border-wp-blue bg-wp-blue ${
              activeTable !== table && "hover:bg-[#0d6fba]"
            } ${activeTable === table && "sepia"}`}
            onClick={() =>
              activeTable !== table && setActiveTable(table)
            }
          >
            <img
              key={"table-image-" + table + timestamp}
              src={image}
              className='shadow-lg w-1/2 md:w-auto'
            />
            <span className='mx-auto my-auto md:my-2 text-blue-50 text-xs uppercase'>
              Bord {table}
            </span>
          </a>
        )
      })}
    </div>
  )
}
