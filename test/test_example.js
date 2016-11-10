// chai assertation library
const chai = require('chai')
const expect = chai.expect
const path = require('path')
var sample = require(path.join('..', 'src', 'example'))


suite('Sample test for CI build', () => {
  suite('Test suite 1', () => {
    let foo
    setup(() => {
      foo = 1
    })
    test('foo is 1', () => {
      expect(foo).to.equal(1)
    })
  })
})
