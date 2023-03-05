import { ReactComponent as TwoScreensIcon } from "../assets/svg/2-screens.svg"
import { ReactComponent as FourScreensIcon } from "../assets/svg/4-screens.svg"
import { ReactComponent as BackIcon } from "../assets/svg/back.svg"
import { ReactComponent as FullscreenIcon } from "../assets/svg/fullscreen.svg"

export default function MultiTablesNav({
  activeTables = [],
  setActiveTables,
  streamingTables
}) {
  const Button = ({ screens }) => (
    <button
      onClick={() => {
        !screens > 1
          ? setActiveTables([])
          : setActiveTables([...streamingTables.slice(0, screens)])
      }}
      className='text-wp-blue-light rounded border border-wp-blue p-2'
    >
      {screens} skærm{screens > 1 && "e"}
    </button>
  )

  const canMultiTable = (streamingTables.length = 1)

  const updateActiveTables = screens => {
    !screens > 1
      ? setActiveTables([])
      : setActiveTables([...streamingTables.slice(0, screens)])
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
      <div
        className={`flex space-x-12`}
      >
        <BackIcon
          className={`fill-current w-24 h-24 ${
            canMultiTable && activeTables.length > 1
              ? "text-wp-blue hover:text-sky-600"
              : "text-gray-300 hover:text-gray-200"
          }`}
          onClick={() =>
            canMultiTable && activeTables.length > 1 && updateActiveTables(1)
          }
        />
        <TwoScreensIcon
          className={`fill-current w-24 h-24 ${
            canMultiTable && activeTables.length > 1
              ? "text-wp-blue hover:text-sky-600"
              : "text-gray-300 hover:text-gray-200"
          }`}
          onClick={() => updateActiveTables(2)}
        />
        <FourScreensIcon
          className={`fill-current w-24 h-24 ${canMultiTable && activeTables.length > 3
            ? "text-wp-blue hover:text-sky-600"
            : "text-gray-300 hover:text-gray-200"}`}
          onClick={() => updateActiveTables(4)}
        />
        {activeTables.length >= 1 && (
          <FullscreenIcon
            className={`fill-current w-24 h-24 ${
              canMultiTable && activeTables.length > 1
              ? "text-wp-blue hover:text-sky-600"
              : "text-gray-300 hover:text-gray-200"
            }`}
            onClick={() =>
              canMultiTable && activeTables.length > 1 && openFullscreen()
            }
          />
        )}
      </div>
      <div className='text-slate-300'>Multiskærm er under udvikling</div>
    </div>
  )
}
