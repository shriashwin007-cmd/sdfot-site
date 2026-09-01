import SmoothScroll from '../components/SmoothScroll'
import Hero from '../components/Hero'
import Exploration from '../components/Exploration'
import About from '../components/About'
import Registration from '../components/Registration'
import Pipeline from '../components/Pipeline'
import Highlights from '../components/Highlights'
import Prizes from '../components/Prizes'
import Districts from '../components/Districts'
import Footer from '../components/Footer'
import Divider from '../components/Divider'

export default function Landing() {
  return (
    <div id="top">
      <SmoothScroll />
      <Hero />
      <Exploration />
      <About />
      <Divider />
      <Registration />
      <Divider />
      <Pipeline />
      <Highlights />
      <Divider />
      <Prizes />
      <Divider />
      <Districts />
      <Footer />
    </div>
  )
}
