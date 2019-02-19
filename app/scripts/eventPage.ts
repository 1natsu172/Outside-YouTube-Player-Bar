// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'
import { notification } from './libs/extensionNotify/notifications'

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion)
  notification(details)
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
