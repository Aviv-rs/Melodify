import { Link } from "react-router-dom";
import { Logo } from "../services/img.import.service";
import welcomeBg from '../assets/imgs/Melodify_welcome.jpeg'


export const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <div className="preload">
                <img src={welcomeBg} alt="" />
            </div>
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