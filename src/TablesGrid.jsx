import { useState, useEffect } from "react"

export default function TablesGrid({ playlist, activeTable, setActiveTable }) {
  const [timestamp, setTimestamp] = useState()

  useEffect(() => {
    // reload images 
    const interval = setInterval(() => {
      setTimestamp(Date.now())
    }, 10000)
    return () => clearInterval(interval)
  },[])

  return (
    <div className='md:grid md:grid-cols-4 2xl:grid-cols-8 md:gap-8 md:mx-44 my-8'>
      {playlist.map((video, index) => {
        return (
          activeTable !== index + 1 && (
            <div
              className='flex flex-col border border-sky-700 bg-sky-800 hover:bg-sky-600 shadow-lg'
              onClick={() => setActiveTable(index + 1)}
            >
              <img
                key={index+timestamp}
                src={video.image}
                className='hidden md:flex'
              />
              <span className='mx-auto my-2 text-sky-200 text-xs uppercase'>
                Bord {index + 1}
              </span>
            </div>
          )
        )
      })}
    </div>
  )
}
