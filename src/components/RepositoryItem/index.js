// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = details
  return (
    <li className="repo-list-items">
      <img src={avatarUrl} alt={name} className="avatar-logo" />
      <h1 className="list-headings">{name}</h1>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icons"
        />
        <p>{starsCount} Stars</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icons"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icons"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
