const types = require('@babel/types')

// 将import {flattenDeep, chunk} from 'lodash' 转化为下面这种写法:
// import flattenDeep from 'lodash/flattenDepp'
// import chunk from 'lodash/chunk'

// Babel将源码转换AST之后，通过遍历AST树（其实就是一个js对象），对树做一些修改，然后再将AST转成code，即成源码。
let visitor = {
  ImportDeclaration(path, ref = { opts: {} }) {
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

module.exports = function () {
  return { visitor }
};