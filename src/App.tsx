import { Home } from './pages/Home'
import { VideoPlayerOverlay } from './components/Player/VideoPlayerOverlay'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
      <VideoPlayerOverlay />
    </div>
  )
}

export default App
