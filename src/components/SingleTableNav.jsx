import React, { useState, useEffect } from "react"

export default function SingleTableNav({
  tablesFormatted,
  inactiveTables,
  activeTables,
  setActiveTables
}) {
  const [timestamp, setTimestamp] = useState(Date.now())

  useEffect(() => {
    // reload images
    const interval = setInterval(() => {
      setTimestamp(Date.now())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`grid grid-cols-1 gap-y-2 md:grid-cols-4 2xl:grid-cols-9 md:gap-8 my-8`}
    >
      {tablesFormatted.map(video => {
        const { number, image } = video
        const isActive = activeTables.includes(video)
        const isNotStreaming = inactiveTables.includes(video)
        return (
          <a
            href={"#"}
            key={"table-container-" + number + timestamp}
            className={`flex md:flex-col  border ${
              isActive
                ? "bg-emerald-900 border-emerald-600"
                : "bg-wp-blue border-wp-blue hover:bg-[#0d6fba]"
            } ${isNotStreaming && "grayscale"}`}
            onClick={() => !isActive && setActiveTables([video])}
          >
            <img
              key={"table-image-" + number + timestamp}
              src={`${image}?${timestamp}`}
              className='shadow-lg w-1/2 md:w-auto'
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
