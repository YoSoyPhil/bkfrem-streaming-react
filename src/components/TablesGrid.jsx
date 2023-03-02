import { useState, useEffect } from "react"

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
      className={`grid grid-cols-1 gap-y-2 md:grid-cols-4 ${
        activeTable > 0 ? "2xl:grid-cols-8" : "2xl:grid-cols-9"
      } md:gap-8 my-8`}
    >
      {playlist.map((video, index) => {
        return (
          activeTable !== index + 1 && (
            <div
              key={"table-container-" + index + timestamp}
              className='flex md:flex-col border border-wp-blue bg-wp-blue hover:bg-[#0d6fba]'
              onClick={() => setActiveTable(index + 1)}
            >
              <img
                key={"table-image-" + index + timestamp}
                src={video.image}
                className='shadow-lg w-1/2 md:w-auto'
              />
              <span className='mx-auto my-auto md:my-2 text-blue-50 text-xs uppercase'>
                Bord {index + 1}
              </span>
            </div>
          )
        )
      })}
    </div>
  )
}
