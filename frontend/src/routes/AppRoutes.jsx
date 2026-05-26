import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import Home from "../pages/Home";

import Login from "../pages/Login";

import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";

import CreateSession from "../pages/CreateSession";

import SessionDetails from "../pages/SessionDetails";

import EditSession from "../pages/EditSession";

import MyBookings from "../pages/MyBookings";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/sessions"
          element={<Home />}
        />

        <Route
          path="/sessions/:id"
          element={<SessionDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

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

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;