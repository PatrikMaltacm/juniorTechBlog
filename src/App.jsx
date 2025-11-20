import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// Firebase
import { onAuthStateChanged } from 'firebase/auth'

// Hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'

//context
import { AuthProvider } from './context/AuthContext'

// pages and components
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './componets/Navbar'
import Footer from './componets/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Dash from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import Search from './pages/Search'
import Post from './pages/Post'

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <BrowserRouter>
      <AuthProvider value={{ user }}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={'/'} />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dash /> : <Navigate to={'/login'} />}
            />
            <Route
              path="/posts/create"
              element={user ? <CreatePost /> : <Navigate to={'/login'} />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to={'/'} />}
            />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
