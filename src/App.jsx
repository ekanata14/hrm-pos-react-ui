import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminIndex from './pages/admin/Index'
import History from './pages/admin/History'
import './index.css'
import Leaderboard from './pages/admin/Leaderboard'
import Profile from './pages/admin/Profile'
import ChangePassword from './pages/admin/ChangePassword'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/dashboard' Component={AdminIndex} />
          <Route path='/history' Component={History} />
          <Route path='/leaderboard' Component={Leaderboard} />
          <Route path='/profile' Component={Profile} />
          <Route path='/changePassword' Component={ChangePassword} />
        </Routes>
      </Router>
    </>
  )
}

export default App
