import { useState } from 'react'
import './App.css'
import Router from './routes/Router'

import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useAuth } from './authentication/useAuth'
import Detail from './pages/Detail'
import EditPost from './pages/EditPost'

function App() {
  const {user} = useAuth();

  return (
    <>
      <div style={{backgroundColor: "#d7dfb9"}}>
        <Router />
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/create-post' element={user ? <CreatePost /> : <Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path='/detail/:id' element={user ? <Detail /> : <Navigate to="/login" replace />} />
          <Route path='/edit-post/:id' element={user ? <EditPost /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  )
}

export default App
