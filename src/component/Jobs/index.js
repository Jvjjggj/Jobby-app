import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import './index.css'
import Profile from '../Profile'

const contants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {profileDetails: {}, upiStatus: contants.initial, jobs: []}

  componentDidMount() {
    this.getProfile()
  }

  update = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  updatedJobs = i => ({
    companyLogoUrl: i.company_logo_url,
    employmentType: i.employment_type,
    jobDescription: i.job_description,
    id: i.id,
    location: i.location,
    packagePerAnnum: i.package_per_annum,
    rating: i.rating,
    title: i.title,
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

    const response2 = await fetch('https://apis.ccbp.in/jobs', options)
    const data2 = await response2.json()

    if (response.ok && response2.ok) {
      const profileDetails = data.profile_details
      const updatedProfileDetails = this.update(profileDetails)

      const jobsDetails = data2.jobs.map(i => this.updatedJobs(i))

      this.setState({
        profileDetails: updatedProfileDetails,
        apiStatus: contants.success,
        jobs: jobsDetails,
      })
    } else {
      this.setState({apiStatus: contants.failure})
    }
  }

  viewSuccesView = () => (
    <div className="extire-contaainer">
      <Header />
      <Profile />
    </div>
  )

  viewJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case contants.success:
        return this.viewSuccesView()

      case contants.failure:
        return this.viewFailureView()

      default:
        return null
    }
  }

  render() {
    return <div>{this.viewJobDetails()}</div>
  }
}

export default Jobs
