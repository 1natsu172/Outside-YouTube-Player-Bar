import popupStyle from '../../../../styles/popup.module.scss'

export const GlobalHeader = () => {
  return (
    <header className={popupStyle.globalHeader}>
      <h1 className={popupStyle.title}>
        {chrome.i18n.getMessage('popup_title')} 😃
      </h1>
      <p className={popupStyle.description}>
        {chrome.i18n.getMessage('popup_description')}
      </p>
    </header>
  )
}
