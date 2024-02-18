import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {errorMsg: '', username: '', password: ''}

  navigateToHome = JwtToken => {
    Cookies.set('jwt_token', JwtToken, {expires: 1})
    const {history} = this.props
    history.push('/')
  }

  submitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.navigateToHome(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  trackUsername = event => {
    this.setState({username: event.target.value})
  }

  trackPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg} = this.state
    return (
      <div className="bg-container">
        <form className="card" onSubmit={this.submitDetails}>
          <img
            className="website-img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="user-id">USERNAME</label>
          <input
            onChange={this.trackUsername}
            type="text"
            id="user-id"
            placeholder="Username"
          />
          <label htmlFor="password-id">PASSWORD</label>
          <input
            onChange={this.trackPassword}
            id="password-id"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <p className="error-para">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default LoginForm
