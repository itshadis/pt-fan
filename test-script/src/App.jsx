import Detail from './pages/detail'
import Home from './pages/home'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='/detail/:params' element={ <Detail /> } />
      </Routes>
    </>
  )
}

export default App