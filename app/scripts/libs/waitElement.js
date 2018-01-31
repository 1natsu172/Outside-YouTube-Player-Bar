function waitElement(mutationTarget, element, rejectTime = 0) {
  return new Promise((resolve, reject) => {
    let hasChanged = false
    const observerConfig = {
      childList: true,
      subtree: true
    }

    // Init check.
    const targetElement = document.querySelector(element)
    if (targetElement !== null) {
      hasChanged = true
      resolve(targetElement)
    }

    const observer = new MutationObserver(mutations => {
      mutations.some(mutation => {
        const targetElement = document.querySelector(element)
        if (targetElement) {
          hasChanged = true
          if (rejectTime > 0) {
            clearTimeout(timer)
          }
          observer.disconnect()
          resolve(targetElement)
          return true; // the same as "break" in `Array.some()`
        }
      })
    })

    // Start observe.
    observer.observe(mutationTarget, observerConfig)

    // Set timer.
    if (rejectTime > 0 && !hasChanged) {
      const timer = setTimeout(() => {
        if (!hasChanged) {
          reject(new Error('Element was not found:' + element))
        }
      }, rejectTime)
    }
  })
}

module.exports = waitElement
