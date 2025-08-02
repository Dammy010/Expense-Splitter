import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddBill from "./pages/AddBill";
import ViewShares from "./pages/ViewShares";
import Settle from "./pages/Settle";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditBill from "./pages/EditBill";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-bill"
        element={
          <ProtectedRoute>
            <AddBill />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-shares"
        element={
          <ProtectedRoute>
            <ViewShares />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settle"
        element={
          <ProtectedRoute>
            <Settle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-bill/:id"
        element={
          <ProtectedRoute>
            <EditBill />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
