const IS_DEV_MODE = !('update_url' in chrome.runtime.getManifest()) // Chrome Web Store adds update_url attribute.
export default (...args: any[]): void => {
  if (IS_DEV_MODE) console.log(...args)
}
