import { ReactComponent as TwoScreensIcon } from "../assets/svg/2-screens.svg"
import { ReactComponent as FourScreensIcon } from "../assets/svg/4-screens.svg"
import { ReactComponent as BackIcon } from "../assets/svg/back.svg"
import { ReactComponent as FullscreenIcon } from "../assets/svg/fullscreen.svg"

export default function MultiTablesNav({
  activeTables,
  setActiveTables,
  streamingTables
}) {
  const canMultiTable = streamingTables.length > 1

  const updateActiveTables = screens => {
    !screens > 1
      ? setActiveTables([])
      : setActiveTables([...streamingTables.slice(0, screens)])
    window.scrollTo(0, 0)
  }

  const openFullscreen = () => {
    const elem = document.getElementById("multiTables")
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen()
    }
  }

  return (
    <div className='hidden md:flex flex-col items-center space-y-4 my-4'>
      {canMultiTable ? (
        <div className={`flex space-x-12`}>
          <BackIcon
            className={`fill-current w-24 h-24 ${
              activeTables.length > 1
                ? "text-wp-blue hover:text-sky-700"
                : "text-gray-400"
            }`}
            onClick={() => activeTables.length > 1 && updateActiveTables(1)}
          />

          <TwoScreensIcon
            className={`fill-current w-24 h-24 ${
              streamingTables.length > 1
                ? "text-wp-blue hover:text-sky-700"
                : "text-gray-400"
            }`}
            onClick={() => streamingTables.length > 1 && updateActiveTables(2)}
          />

          <FourScreensIcon
            className={`fill-current w-24 h-24 ${
              streamingTables.length > 3
                ? "text-wp-blue hover:text-sky-700"
                : "text-gray-400"
            }`}
            onClick={() => streamingTables.length > 3 && updateActiveTables(4)}
          />

          <FullscreenIcon
            className={`fill-current w-24 h-24 text-wp-blue hover:text-sky-700`}
            onClick={() => openFullscreen()}
          />
        </div>
      ) : (
        <div className='text-slate-300'>
          Multi bordvisning kræver over en aktiv stream
        </div>
      )}
    </div>
  )
}
