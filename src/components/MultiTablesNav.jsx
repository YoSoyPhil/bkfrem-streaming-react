import FullscreenIcon from '../assets/fullscreen-icon.svg'

export default function MultiTablesNav({ multiTables = [], setMultiTables, streamingTables }) {

  const Button = ({ screens }) => (
    <button
      onClick={() => {
        !screens > 1
          ? setMultiTables([])
          : setMultiTables([...streamingTables.slice(0, screens)])
      }}
      className='text-wp-blue-light rounded border border-wp-blue px-2'
    >
      {screens} skærm{screens > 1 && 'e'}
    </button>
  )

  const ButtonFullScreen = () => {
    function openFullscreen() {
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
      <div className='hover:bg-sky-700 px-2'>

      <img src={FullscreenIcon} alt="Fullscreen icon" className='w-14' onClick={() => openFullscreen()}/>
      </div>
    )
  }

  return (
    <div className='hidden md:flex flex-col items-center space-y-4 my-4'>
      <div className='flex space-x-12'>

      <div className='flex justify-center my-2 space-x-2'>
        <Button screens={1} />
        <Button screens={2} />
        <Button screens={4} />
      </div>
        {multiTables.length > 1 && <ButtonFullScreen />}
      </div>
      <div className='flex flex-col items-center text-sky-700'>
        <div>Multiskærm visning er pt. under udvikling</div>
        <div>Der kan forekomme fejl</div>
        <br />
        <div>Som start vælges den selv de første aktive borde,</div>
        <div>snarest muligt kan der vælges bord i multismærm visning</div>
      </div>
    </div>
  )
}
