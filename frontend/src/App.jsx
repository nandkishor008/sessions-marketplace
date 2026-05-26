import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Sessions from "./pages/Sessions";
import CreateSession from "./pages/CreateSession";
import SessionDetails from "./pages/SessionDetails";
import EditSession from "./pages/EditSession";
import MyBookings from "./pages/MyBookings";
import CreatorDashboard from "./pages/CreatorDashboard";
import MySessions from "./pages/MySessions";
import CreatorBookings from "./pages/CreatorBookings";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Navbar />

      <Routes>
        {/* HOME */}

        <Route path="/" element={<Home />} />

        {/* AUTH */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* SESSIONS */}

        <Route path="/sessions" element={<Sessions />} />

        <Route path="/sessions/:id" element={<SessionDetails />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-session"
          element={
            <ProtectedRoute>
              <CreateSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-session/:id"
          element={
            <ProtectedRoute>
              <EditSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator-dashboard"
          element={
            <ProtectedRoute>
              <CreatorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-session/:id"
          element={
            <ProtectedRoute>
              <EditSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <MySessions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creator-bookings"
          element={
            <ProtectedRoute>
              <CreatorBookings />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
