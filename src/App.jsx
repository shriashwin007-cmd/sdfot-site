import { Routes, Route } from 'react-router-dom'
import SceneCanvas from './components/SceneCanvas'
import CustomCursor from './components/CustomCursor'
import FloatingSocial from './components/FloatingSocial'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import PlayersPage from './pages/PlayersPage'
import './App.css'

function App() {
  return (
    <>
      <SceneCanvas />
      <CustomCursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/players" element={<PlayersPage />} />
      </Routes>
      <FloatingSocial />
    </>
  )
}

export default App
