
import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderMain from './components/HeaderMain/HeaderMain'


function App() {

  return (
    <main>
      <HeaderMain />
      <Outlet />
    </main>
  )
}

export default App
