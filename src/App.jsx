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
import Items from './pages/admin/Items'
import ItemsBySupplier from './pages/admin/ItemsBySupplier'
import AddItem from './pages/admin/AddItem'
import AddSupplier from './pages/admin/AddSupplier'

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
          <Route path='/items' Component={Items} />
          <Route path='/items/:id' Component={ItemsBySupplier} />
          <Route path='/addItem' Component={AddItem} />
          <Route path='/addSupplier' Component={AddSupplier} />
        </Routes>
      </Router>
    </>
  )
}

export default App
