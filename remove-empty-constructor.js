// removes empty constructors (ignoring calls to super)
export default function transformer(file, api) {
  const j = api.jscodeshift

  const root = j(file.source)

  root
    .find(j.ClassDeclaration)
    .find(j.MethodDefinition, { kind: 'constructor' })
    .forEach(constructorDefinition => {
      const nonSuperCalls = j(constructorDefinition)
        .find(j.BlockStatement)
        .get('body')
        .filter(x => {
          const superCalls = j(x).find(j.CallExpression, {
            callee: { type: 'Super' }
          })
          return superCalls.size() === 0
        })

      if (nonSuperCalls.length === 0) {
        j(constructorDefinition).remove()
      }
    })

  return root.toSource()
}
