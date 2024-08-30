import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

import './index.css'

class CourseItemDetails extends Component {
  state = {courseItem: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseItem()
  }

  getCourseItem = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'Get',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateCourse = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseItem: updateCourse,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.fail})
    }
  }

  renderSuccessView = () => {
    const {courseItem} = this.state
    return (
      <div className="courseItem-container">
        <div className="courseItem-card">
          <img
            src={courseItem.imageUrl}
            alt={courseItem.name}
            className="courseItem-image"
          />
          <div className="courseItem-two">
            <h1 className="courseItem-name">{courseItem.name}</h1>
            <p className="courseItem-description">{courseItem.description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

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
          onClick={this.getCourseItem}
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

export default CourseItemDetails
