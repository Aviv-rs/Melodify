import { Link } from "react-router-dom";
import { Logo } from "../services/img.import.service";

export const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <div className="logo-container">
                <div className="logo-svg">
                    <Logo />
                </div>
                <span className='brand-txt'>Melodify</span>
            </div>
            <div className="main-welcome">
                <div className="text-container">MUSIC. ANYWHERE.</div>
                <Link to="/music">
                    <button>Start listening</button>
                </Link>
            </div>
        </div>

    )

} 