import pipe from './pipe'
import constructorStateToClassProperty from './constructor-state-to-class-property.js'
import removeEmptyConstructor from './remove-empty-constructor.js'

const testMod = (transform, source, expectedOutput) => {
  const jscodeshift = require('jscodeshift')
  const output = transform({ source }, { jscodeshift }, {})
  expect(output).toEqual(expectedOutput)
}

describe('pipe', () => {
  it('returns a codemod that applies the given codemods in-order', () => {
    const source = `
class MyComponent {
  constructor () {
    this.state = 42
  }
}`
    const output = `
class MyComponent {
  state = 42;
}`
    const combinedMod = pipe(constructorStateToClassProperty, removeEmptyConstructor)
    testMod(combinedMod, source, output)
  })
})
