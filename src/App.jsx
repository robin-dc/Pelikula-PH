import { Home, Login } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="authenticated" element={<Home/>}/>
    </Routes>
  )
}

export default App
