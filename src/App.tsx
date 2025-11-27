import './App.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <BrowserRouter>
    <nav className="p-4 bg-gray-100 flex gap-4">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
