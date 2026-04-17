import { Link } from "react-router"
import { useState } from "react"

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header>
            <div className="header-content">
                <div className="logo">
                    <img className="LogoIMG-" src="/Billeder/Logo/logo.svg" alt="Børnelejren Logo" />
                </div>
                <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </button>
                <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
                    <ul>
                        <li><Link to="/" onClick={closeMenu}>Forside</Link></li>
                        <li><Link to="/about" onClick={closeMenu}>Om os</Link></li>
                        <li><Link to="/sponsor" onClick={closeMenu}>Bliv sponsor</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header