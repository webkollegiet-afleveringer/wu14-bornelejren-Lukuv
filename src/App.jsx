import { Routes, Route } from "react-router"
import Header from "./Components/Header.jsx"
import Home from "./Components/Home.jsx"
import About from "./Components/About.jsx"
import Sponsor from "./Components/Sponsor.jsx"
import Thanks from "./Components/Thanks.jsx"
import NotFound from "./Components/NotFound.jsx"
import Footer from "./Components/Footer.jsx"
import "./style.sass"

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
