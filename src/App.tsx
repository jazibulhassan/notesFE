import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard.tsx";

function App() {

  return (
    <BrowserRouter>
    {/*<nav className="p-4 bg-gray-100 flex gap-4">*/}
    {/*  <Link to="/login">Login</Link>*/}
    {/*  <Link to="/register">Register</Link>*/}
    {/*</nav>*/}

    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Login />} /> {/* redirect unknown routes */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
