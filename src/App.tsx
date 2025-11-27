import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard.tsx";
import CreateNote from "./pages/CreateNote.tsx";

function App() {

  return (
    <BrowserRouter>


    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="*" element={<Login />} /> {/* redirect unknown routes */}
    </Routes>
  </BrowserRouter>
  )
}

export default App
