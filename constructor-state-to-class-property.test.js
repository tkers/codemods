import constructorStateToClassProperty from './constructor-state-to-class-property.js'

const testMod = (transform, source, expectedOutput) => {
  const jscodeshift = require('jscodeshift')
  const output = transform({ source }, { jscodeshift }, {})
  expect(output).toEqual(expectedOutput)
}

describe('constructor-state-to-class-property', () => {
  it('moves the state assignment from the constructor to a class property', () => {
    const source = `
class MyComponent {
  constructor () {
    this.state = 42
  }
}`
    const output = `
class MyComponent {
  state = 42;
  constructor () {}
}`
    testMod(constructorStateToClassProperty, source, output)
  })
  it('does not modify other assignments', () => {
    const source = `
class MyComponent {
  constructor () {
    this.state = 42
    this.foo = 'bar'
  }
}`
    const output = `
class MyComponent {
  state = 42;
  constructor () {
    this.foo = 'bar'
  }
}`
    testMod(constructorStateToClassProperty, source, output)
  })
  it('does not do anything if there is no state assignment present', () => {
    const source = `
class MyComponent {
  constructor () {
    this.foo = 'bar'
  }
}`
    testMod(constructorStateToClassProperty, source, source)
  })
})
