import pipe from './pipe'

// transformations have to be applied in order
export default compose(
  require('./constructor-state-to-class-property').default,
  require('./remove-empty-constructor').default
)
