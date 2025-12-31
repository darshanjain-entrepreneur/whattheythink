import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAvatarClick = () => {
        setShowMenu(!showMenu);
    };

    const getAvatarContent = () => {
        return user?.username?.charAt(0).toUpperCase() || '?';
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">
                    WHATTHEYTHINK
                </Link>

                {user && (
                    <div className="navbar-nav">
                        <Link
                            to="/"
                            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            Groups
                        </Link>
                        <Link
                            to="/inbox"
                            className={`navbar-link ${location.pathname === '/inbox' ? 'active' : ''}`}
                        >
                            Inbox
                        </Link>

                        <div className="navbar-profile">
                            <div
                                className="navbar-avatar"
                                onClick={handleAvatarClick}
                                title={user.username}
                            >
                                {getAvatarContent()}
                            </div>

                            {showMenu && (
                                <div className="navbar-dropdown">
                                    <div className="navbar-dropdown-header">
                                        <span className="navbar-dropdown-username">{user.username}</span>
                                    </div>
                                    <button onClick={handleLogout} className="navbar-dropdown-item navbar-dropdown-logout">
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close menu */}
            {showMenu && (
                <div
                    className="navbar-overlay"
                    onClick={() => setShowMenu(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
