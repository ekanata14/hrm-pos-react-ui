import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminIndex from "./pages/admin/Index";
import History from "./pages/admin/History";
import "./index.css";
import Leaderboard from "./pages/admin/Leaderboard";
import Profile from "./pages/admin/Profile";
import ChangePassword from "./pages/admin/ChangePassword";
import Items from "./pages/admin/items/Items";
import ItemsBySupplier from "./pages/admin/items/ItemsBySupplier";
import AddItem from "./pages/admin/items/AddItem";
import AddSupplier from "./pages/admin/AddSupplier";
import AddStock from "./pages/admin/items/AddStock";
import Users from './pages/admin/users/Users';
import UserEdit from './pages/admin/users/UserEdit';
import UserAdd from "./pages/admin/users/UserAdd";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/dashboard" Component={AdminIndex} />
            <Route path="/history" Component={History} />
            <Route path="/leaderboard" Component={Leaderboard} />
            <Route path="/profile" Component={Profile} />
            {/* Change to use id by passing the parameter */}
            <Route path="/changePassword" Component={ChangePassword} />$ 
            <Route path="/items" Component={Items} />
            <Route path="/items/:id" Component={ItemsBySupplier} />
            <Route path="/addItem/:id" Component={AddItem} />
            <Route path="/addSupplier" Component={AddSupplier} />
            <Route path="/addStock/:idItem/:idSupplier" Component={AddStock} />
            <Route path="/users" Component={Users} />
            <Route path="/users/:id" Component={UserEdit} />
            <Route path="/users/add" Component={UserAdd} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
