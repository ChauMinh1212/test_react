import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import './App.css'
import AuthPage from './pages/AuthPage/AuthPage'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        {/* <Route path='/:username' element={<ProfilePage />} /> */}
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  )
}
