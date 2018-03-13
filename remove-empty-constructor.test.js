import removeEmptyConstructor from './remove-empty-constructor.js'

const testMod = (transform, source, expectedOutput) => {
  const jscodeshift = require('jscodeshift')
  const output = transform({ source }, { jscodeshift }, {})
  expect(output).toEqual(expectedOutput)
}

describe('remove-empty-constructor', () => {
  it('leaves non-empty constructors intact', () => {
    const source = `class MyComponent {
      constructor () {
        this.foo = 42
      }
    }`
    const output = `class MyComponent {
      constructor () {
        this.foo = 42
      }
    }`
    testMod(removeEmptyConstructor, source, output)
  })
  it('leaves non-empty constructors including a call to super intact', () => {
    const source = `class MyComponent {
      constructor () {
        super()
        this.foo = 42
      }
    }`
    const output = `class MyComponent {
      constructor () {
        super()
        this.foo = 42
      }
    }`
    testMod(removeEmptyConstructor, source, output)
  })
  it('removes constructors that are empty', () => {
    const source = `class MyComponent {
      constructor () {}
    }`
    const output = `class MyComponent {}`
    testMod(removeEmptyConstructor, source, output)
  })
  it('removes constructors that only contain a call to super', () => {
    const source = `class MyComponent {
      constructor () {
        super()
      }
    }`
    const output = `class MyComponent {}`
    testMod(removeEmptyConstructor, source, output)
  })
})
