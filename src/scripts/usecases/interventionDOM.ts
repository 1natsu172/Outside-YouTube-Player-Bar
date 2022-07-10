import { oypbClassNames } from '../../interfaces'

export const interventionDOM = {
  addVisiblePlayerBarClassName() {
    document.body.classList.add(oypbClassNames['IS-VISIBLE-PLAYERBAR'])
  },
  removeVisiblePlayerBarClassName() {
    document.body.classList.remove(oypbClassNames['IS-VISIBLE-PLAYERBAR'])
  },
  addOutsidePlayerBarClassName() {
    document.body.classList.add(oypbClassNames['IS-OUTSIDE-PLAYERBAR'])
  },
  removeOutsidePlayerBarClassName() {
    document.body.classList.remove(oypbClassNames['IS-OUTSIDE-PLAYERBAR'])
  },
  toggleOutsidePlayerBarClassName() {
    document.body.classList.toggle(oypbClassNames['IS-OUTSIDE-PLAYERBAR'])
  },
}
