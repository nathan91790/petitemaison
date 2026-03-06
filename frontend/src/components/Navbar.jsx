import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav style={{
            width: "100%",
            background: "#111",
            padding: "15px 40px",
            boxSizing: "border-box"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "1100px",
                margin: "0 auto"
            }}>
                <Link
                    to="/"
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        textDecoration: "none",
                        fontSize: "18px"
                    }}
                >
                    Petite Maison 👻
                </Link>

                <div>

                    {!user && (
                        <>
                            <Link to="/login" style={linkStyle}>Login</Link>
                            <Link to="/register" style={linkStyle}>Register</Link>
                        </>
                    )}

                    {user && (
                        <>
                            <span style={{ color: "white", marginLeft: "20px" }}>
                                {user.email}
                            </span>
                            <button
                                onClick={logout}
                                style={linkStyle}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

const linkStyle = {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none"
};

const buttonStyle = {
    marginLeft: "20px",
    padding: "5px 10px",
    cursor: "pointer"
};

export default Navbar;
