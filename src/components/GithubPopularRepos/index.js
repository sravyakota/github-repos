/* eslint-disable react/no-unknown-property */
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    selectedRepo: languageFiltersData[0].id,
    isLoading: true,
    status: '',
  }

  componentDidMount() {
    this.repoApi()
  }

  repoApi = async () => {
    this.setState({status: 'loading'})
    const {selectedRepo} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedRepo}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(response)
    console.log(response.status)
    // console.log(data.popular_repos)
    if (response.ok) {
      const updatedList = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repoList: updatedList,
        isLoading: false,
        status: 'success',
      })
    } else {
      this.setState({status: 'failure'})
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {repoList, isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          <ul className="repos-list-items-container">
            {repoList.map(eachRepo => (
              <RepositoryItem details={eachRepo} key={eachRepo.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="error"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong</p>
    </div>
  )

  onChangeLanguage = id => {
    this.setState({selectedRepo: id}, this.repoApi)
  }

  renderResults = () => {
    const {status} = this.state
    switch (status) {
      case 'success':
        return this.renderRepos()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {selectedRepo} = this.state
    // const resultView =
    //   status === 'success' ? this.renderRepos() : this.renderFailureView()

    return (
      <div className="github-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="repos-list-container">
          {languageFiltersData.map(eachRepo => (
            <LanguageFilterItem
              details={eachRepo}
              key={eachRepo.id}
              onChangeLanguage={this.onChangeLanguage}
              isActive={eachRepo.id === selectedRepo}
            />
          ))}
        </ul>

        {this.renderResults()}
      </div>
    )
  }
}

export default GithubPopularRepos
