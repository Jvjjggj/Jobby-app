import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const contants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: contants.initial}

  componentDidMount() {
    this.getProfile()
  }

  update = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getProfile = async () => {
    this.setState({apiStatus: contants.inprogress})

    const url = 'https://apis.ccbp.in/profile'

    const JwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const profileDetails = data.profile_details
      console.log(profileDetails)
      const updatedProfileDetails = this.update(profileDetails)

      this.setState({
        profileDetails: updatedProfileDetails,
        apiStatus: contants.success,
      })
    } else {
      this.setState({apiStatus: contants.failure})
    }
  }

  viewSuccess = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div>
        <div className="card">
          <img className="profile-img" src={profileImageUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
        <hr />
        <h1 className="employment-heading">Type of Employment</h1>
        <ul className="unorder-list">
          <li className="list">
            <input id="fullTimeId" type="checkbox" />
            <label htmlFor="fullTimeId">Full Time</label>
          </li>
          <li className="list">
            <input id="partTimeId" type="checkbox" />
            <label htmlFor="partTimeId">Part Time</label>
          </li>
          <li className="list">
            <input id="freelanceId" type="checkbox" />
            <label htmlFor="freelanceId">Freelance</label>
          </li>
          <li className="list">
            <input id="intershipId" type="checkbox" />
            <label htmlFor="intershipId">Internship</label>
          </li>
        </ul>
        <hr />
        <h1 className="employment-heading">Salary Range</h1>
        <ul className="unorder-list">
          <li className="list">
            <input id="tenId" type="radio" />
            <label htmlFor="tenId">10 LPA and Above</label>
          </li>
          <li className="list">
            <input id="twentyId" type="radio" />
            <label htmlFor="twentyId">10 LPA and Above</label>
          </li>
          <li className="list">
            <input id="thirtyId" type="radio" />
            <label htmlFor="tirtyId">10 LPA and Above</label>
          </li>
          <li className="list">
            <input id="fortyId" type="radio" />
            <label htmlFor="fortyId">10 LPA and Above</label>
          </li>
        </ul>
      </div>
    )
  }

  viewProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  viewProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case contants.success:
        return this.viewSuccess()

      case contants.inprogress:
        return this.viewProgress()

      default:
        return null
    }
  }

  render() {
    return <div className="profile-card">{this.viewProfileDetails()}</div>
  }
}

export default Profile
