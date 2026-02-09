import { Home } from './pages/Home'
import { VideoPlayerOverlay } from './components/Player/VideoPlayerOverlay'

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Home />
      <VideoPlayerOverlay />
    </div>
  )
}

export default App
