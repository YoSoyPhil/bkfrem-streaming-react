import { useState } from "react";
import VideoGrid from "./VideoGrid";

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className="App">
      <VideoGrid activePlaylistIndex={activeIndex} />
    </div>
  );
}

export default App;
