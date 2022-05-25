import { NavLink } from 'react-router-dom'
// nav links svg icons
import { Logo, Home, HomeActive, Search, SearchActive, Library, LibraryActive } from '../services/img.import.service'

// memo (?)
export const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="logo-container">
                <Logo />
            </div>
            <ul className="nav-list">
                <li>
                    <nav>
                        <NavLink to="/">
                            <Home fill="#b3b3b3" />
                            Home
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="search">
                            <Search fill="#b3b3b3" />
                            Search
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="library">
                            <Library fill="#b3b3b3" />
                            Your Library
                        </NavLink>
                    </nav>
                </li>
            </ul>
        </nav>

    )
}