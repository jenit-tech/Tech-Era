import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Course from '../Course'
import './index.css'

const apiStatusConstants = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class Home extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const url = ' https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        courseList: formatData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="course-container">
        <h1 className="course-header">Courses</h1>
        <ul className="course-list">
          {courseList.map(eachCourse => (
            <Course courseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailView = () => (
    <div className="fail-container">
      <div className="fail-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="fail-image"
        />
        <h1 className="fail-heading">Oops! Something Went wRONG</h1>
        <p className="fail-paragraph">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          onClick={this.getCourses}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  finalRendering = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.fail:
        return this.renderFailView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.finalRendering()}</div>
      </div>
    )
  }
}

export default Home
