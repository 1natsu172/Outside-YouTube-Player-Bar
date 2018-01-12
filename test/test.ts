import test from 'ava'

test('Insert to DOM', t => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  t.is(document.querySelector('div'), div)
})
