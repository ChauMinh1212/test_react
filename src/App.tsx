import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ListStockPage from './pages/ListStockPage/ListStockPage'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/list' element={<ListStockPage />} />
        {/* <Route path='/:username' element={<ProfilePage />} /> */}
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  )
}
