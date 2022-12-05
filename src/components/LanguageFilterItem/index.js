import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  onClickLanguage = () => {
    // this.setState(prevState => ({isClicked: !prevState.isClicked}))
    const {details, onChangeLanguage} = this.props
    const {id} = details
    onChangeLanguage(id)
  }

  render() {
    const {details, isActive} = this.props
    const {language} = details

    const style = isActive ? 'styling-button' : 'button'
    return (
      <li>
        <button type="button" onClick={this.onClickLanguage} className={style}>
          {language}
        </button>
      </li>
    )
  }
}

export default LanguageFilterItem
