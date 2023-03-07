import React, { useState, useEffect } from "react"

export default function SingleTableNav({
  tablesFormatted,
  inactiveTables,
  activeTables,
  setActiveTables
}) {
  const [timestamp, setTimestamp] = useState(Date.now())
  const [images, setImages] = useState(
    [...tablesFormatted].map(table => table.image)
  )

  useEffect(() => {
    // reload images
    const interval = setInterval(() => {
      setImages(
        [...tablesFormatted].map(table => table.image + "?" + Date.now())
      )
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`grid grid-cols-1 gap-y-2 md:grid-cols-4 2xl:grid-cols-9 md:gap-8 my-8`}
    >
      {tablesFormatted.map((table,index) => {
        const { number } = table
        const isActive = activeTables.includes(table)
        const isNotStreaming = inactiveTables.includes(table)
        return (
          <a
            href={"#"}
            key={"table-container-" + number}
            className={`flex md:flex-col border w-full ${
              isActive
                ? "bg-emerald-900 border-emerald-600"
                : "bg-wp-blue border-wp-blue hover:bg-[#0d6fba]"
            } ${isNotStreaming && "grayscale"}`}
            onClick={() => !isActive && setActiveTables([table])}
          >
            <img
              key={"table-image-" + number + timestamp}
              src={`${images[index]}?${timestamp}`}
              className='shadow-lg w-1/2 lg:w-full md:w-auto'
            />
            <span className='mx-auto my-auto md:my-2 text-blue-50 text-xs uppercase'>
              Bord {number}
            </span>
          </a>
        )
      })}
    </div>
  )
}
