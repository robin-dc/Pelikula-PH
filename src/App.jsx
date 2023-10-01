import { Home, Login, Profiles } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="signin" element={<Login/>}/>
      <Route path="profiles" element={<Profiles/>}/>
      <Route path="users" element={<Home/>}/>
    </Routes>
  )
}

export default App
