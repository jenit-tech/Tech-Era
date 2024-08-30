import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  return (
    <div className="header-container">
      <nav className="navbar">
        <Link to="/" className="link-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="image-header"
          />
        </Link>
      </nav>
    </div>
  )
}

export default Header
