import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <nav className="bg-black/80 backdrop-blur-md border-b border-purple-900 py-6">

            <div className="max-w-6xl mx-auto flex items-center px-6">

                {/* LOGO */}

                <Link
                    to="/"
                    className="text-3xl font-bold title-glow"
                >
                    👻 PetiteMaison
                </Link>

                {/* ZONE UTILISATEUR */}

                <div className="ml-auto mr-16 flex items-center gap-8">

                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-purple-400 text-lg transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn-primary"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <span className="text-gray-400">
                                {user.email}
                            </span>

                            <button
                                onClick={logout}
                                className="btn-primary"
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

export default Navbar;