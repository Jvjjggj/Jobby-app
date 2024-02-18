import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <ul className="unorder-list">
        <li>
          <Link to="/">
            <img
              className="website-img"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
      </ul>
      <ul className="icons">
        <li>
          <Link className="home-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="home-link" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <button onClick={logout} type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
