import { Link } from "react-router-dom";
import { Logo } from "../services/img.import.service";


export const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <div className="logo-container">
                <Logo />
            </div>
            <div className="main-welcome">
            <div className="text-flicker-in-glow">MUSIC. ANYWHERE.</div>
                <Link to="/music">
                    <button>Try it for free</button>
                </Link>
            </div>
        </div>
    )

} 