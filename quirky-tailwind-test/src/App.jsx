import './App.css'
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Listings from './pages/Listings';
import LogComplaintPage from './pages/LogComplaintPage';
import PrivateRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Future: Listings, Login, Register routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/log-complaint" element={
          <PrivateRoute>
            <LogComplaintPage />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Listings />
          </PrivateRoute>
        } />

      </Routes>
    </>
  )
}

export default App
