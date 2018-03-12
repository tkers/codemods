// moves this.state assignment in constructor to class property
export default function transformer(file, api) {
  const j = api.jscodeshift

  const root = j(file.source)

  root
    .find(j.ClassDeclaration)
    .find(j.MethodDefinition, { kind: 'constructor' })
    .find(j.AssignmentExpression, {
      left: { object: j.ThisExpression, property: { name: 'state' } }
    })
    .forEach(stateAssignment => {
      const idName = stateAssignment.node.left.property
      const stateValue = stateAssignment.node.right
      const stateProperty = j.classProperty(idName, stateValue, null, false)

      j(stateAssignment)
        .closest(j.ClassBody)
        .get('body')
        .insertAt(0, stateProperty)

      j(stateAssignment).remove()
    })

  return root.toSource()
}
