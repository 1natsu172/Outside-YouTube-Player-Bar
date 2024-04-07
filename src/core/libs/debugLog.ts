const IS_DEV_MODE = !('update_url' in browser.runtime.getManifest()) // Chrome Web Store adds update_url attribute.
export default (...args: any[]): void => {
  if (IS_DEV_MODE) console.log(...args)
}
