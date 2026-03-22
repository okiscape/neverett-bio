import Landscape from "./pages/landscape"
import Portrait from "./pages/portrait"

function App() {
  if (window.innerWidth <= window.innerHeight) {
    return (<Portrait/>)
  } else {
    return (<Landscape/>)
  }
}

export default App
