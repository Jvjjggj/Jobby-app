import Cookies from 'js-cookie'
import './index.css'
import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import Header from '../Header'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="home-section">
        <Header />
        <div className="home-details">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button className="find-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
