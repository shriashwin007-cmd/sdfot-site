import Nav from './components/Nav'
import Hero from './components/Hero'
import ScrollCanvas from './components/ScrollCanvas'
import About from './components/About'
import Registration from './components/Registration'
import Pipeline from './components/Pipeline'
import Highlights from './components/Highlights'
import Prizes from './components/Prizes'
import Districts from './components/Districts'
import Footer from './components/Footer'
import FloatingSocial from './components/FloatingSocial'
import './App.css'

function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <ScrollCanvas />
      <About />
      <Registration />
      <Pipeline />
      <Highlights />
      <Prizes />
      <Districts />
      <Footer />
      <FloatingSocial />
    </div>
  )
}

export default App
