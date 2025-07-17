import './App.css'
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Listings from './pages/Listings';
import LogComplaintPage from './pages/LogComplaintPage';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Future: Listings, Login, Register routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/log-complaint" element={<LogComplaintPage />} />
        <Route path="/dashboard" element={<Listings />} />

      </Routes>
    </Router>
  )
}

export default App
