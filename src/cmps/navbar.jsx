import { NavLink } from 'react-router-dom'
// nav links svg icons
import { Logo, Home, HomeActive, Search, SearchActive, Library, LibraryActive, CreatePlaylists, LikedSongs } from '../services/img.import.service'

// memo (?)
export const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="logo-container">
                <NavLink to="/">
                    <Logo className="logo-svg" />
                </NavLink>
            </div>
            <ul className="nav-list">
                <li>
                    <nav>
                        <NavLink to="/">
                            <Home fill="#b3b3b3" />
                            <span>Home</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="search">
                            <Search fill="#b3b3b3" />
                            <span>Search</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="library">
                            <Library fill="#b3b3b3" />
                            <span>Your Library</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav className="create-playlists-nav">
                        <NavLink to="station">
                            <div className="create-playlists">
                                <CreatePlaylists fill="#000" />
                            </div>
                            <span>Create Playlists</span>
                        </NavLink>
                    </nav>
                </li>
                <li>
                    <nav>
                        <NavLink to="library">
                            <div className="liked-songs">
                                <LikedSongs fill="#b3b3b3" />
                            </div>
                            <span>Liked Songs</span> 
                        </NavLink>
                    </nav>
                </li>
            </ul>
            <br className="separation-line"></br>
        </nav>

    )
}