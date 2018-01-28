const ExtensionSwitcherWrapper = class ExtensionSwitcherWrapper {
  private _isExtensionActioning: Boolean

  constructor() {
    this._isExtensionActioning = false
  }

  active = (): void => {
    document.body.classList.add('oypb-is-outside-playerBar')
    this._isExtensionActioning = true
    console.log('is?', this._isExtensionActioning)
  }

  inactive = (): void => {
    document.body.classList.remove('oypb-is-outside-playerBar')
    this._isExtensionActioning = false
    console.log('is?', this._isExtensionActioning)
  }

  pause = (): void => {
    if (this._isExtensionActioning) {
      document.body.classList.toggle('oypb-is-outside-playerBar')
      console.log('is?', 'pause')
    }
  }

  toggle = (): void => {
    console.log('is?', this._isExtensionActioning)
    document.body.classList.toggle('oypb-is-outside-playerBar')
    this._isExtensionActioning = this._isExtensionActioning ? false : true
    console.log('is?', this._isExtensionActioning)
  }

  isExtensionActioning = (): Boolean => {
    return this._isExtensionActioning
  }
}

const extensionSwitcher = new ExtensionSwitcherWrapper()

export default extensionSwitcher
