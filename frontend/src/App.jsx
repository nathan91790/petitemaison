import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <main style={{
          maxWidth: "1100px",
          margin: "60px auto",
          padding: "20px"
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;