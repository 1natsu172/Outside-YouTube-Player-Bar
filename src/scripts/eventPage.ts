// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import { notification } from './libs/extensionNotify/notifications'

const WANNA_NOTIFY = true

chrome.runtime.onInstalled.addListener(details => {
  const previousVersion = details.previousVersion
  const currentVersion = chrome.runtime.getManifest().version
  const isDiffVersion = previousVersion !== currentVersion

  console.log('previousVersion', previousVersion)
  console.log('currentVersion', currentVersion)

  if (details.reason === 'install') {
    notification(details)
  }

  if (details.reason === 'update') {
    WANNA_NOTIFY && isDiffVersion && notification(details)
  }
})

// // When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              schemes: ['https'],
              hostContains: '.youtube.com'
              // pathContains: '/watch'
            }
          })
        ],
        // And shows the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })
})

console.log(chrome.runtime.getManifest().name)
