import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

//context

import { AuthProvider } from './context/AuthContext'

// pages and components
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './componets/Navbar'
import Footer from './componets/Footer'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
