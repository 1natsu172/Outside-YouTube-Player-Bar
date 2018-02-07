import test from 'ava'
import { isVideo } from '../../app/scripts/libs/judgePage'

const browserEnv = require('browser-env')

const trueURL = ['https://www.youtube.com/watch?v=wbSwFU6tY1c']

const falseURL = [
  'https://www.youtube.com/',
  'https://www.youtube.com/user/spacexchannel'
]

test('isVideo? => trueURL', t => {
  trueURL.forEach((v, i) => {
    browserEnv(['location'], { url: v })
    t.true(isVideo())
  })
})

test('isVideo? => falseURL', t => {
  falseURL.forEach((v, i) => {
    browserEnv(['location'], { url: v })
    t.false(isVideo())
  })
})
