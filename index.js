module.exports = ( { types } ) => {
  return {
    visitor: {
      ImportDeclaration(path) {
        let node = path.node
        let { specifiers } = node
        if ('k12lib' === node.source.value && !types.isImportDefaultSpecifier(specifiers[0])) {
          let newImports = specifiers.map(specifier => {
            return types.importDeclaration(
              [types.importDefaultSpecifier(specifier.local)],
              types.stringLiteral(`${node.source.value}/components/${specifier.local.name}`)
            )
          })
          path.replaceWithMultiple(newImports)
        }
      }
    }
  }
}
