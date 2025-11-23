import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Dash from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import Search from './pages/Search'
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import EmailVerificationBanner from './components/EmailVerificator'

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <AuthProvider value={{ user }}>
        <NavBar />
        <EmailVerificationBanner />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App