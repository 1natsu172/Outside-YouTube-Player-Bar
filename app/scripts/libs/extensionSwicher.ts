const ExtensionSwitcherWrapper = class ExtensionSwitcherWrapper {
  private _isExtensionActioning: Boolean

  constructor() {
    this._isExtensionActioning = false
  }

  action = (): void => {
    document.body.classList.add('is-outsided-playerBar')
    this._isExtensionActioning = true
    console.log('is?', this._isExtensionActioning)
  }

  stop = (): void => {
    document.body.classList.remove('is-outsided-playerBar')
    this._isExtensionActioning = false
    console.log('is?', this._isExtensionActioning)
  }

  pause = (): void => {
    if (this._isExtensionActioning) {
      document.body.classList.toggle('is-outsided-playerBar')
      console.log('is?', 'pause')
    }
  }
}

const extensionSwitcher = new ExtensionSwitcherWrapper()

export default extensionSwitcher
