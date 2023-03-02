// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser

/**
 * @type {import('jscodeshift').Transform}
 */
module.exports = function transformer(file, api) {
  const j = api.jscodeshift

  const source = j(file.source)

  source
    .find(j.ImportDeclaration)
    .filter(element => element.value.source.value === 'twin.macro')
    .replaceWith(() =>
      j.importDeclaration(
        [j.importSpecifier(j.identifier('tw'))],
        j.stringLiteral('~/lib/tw'),
      ),
    )

  source
    .find(j.JSXAttribute)
    .filter(path => {
      return path.value.name.name === 'tw'
    })
    .replaceWith(element =>
      j.jsxAttribute(
        j.jsxIdentifier('className'),
        j.jsxExpressionContainer(
          j.callExpression(j.identifier('tw'), [element.value.value]),
        ),
      ),
    )

  const cssAttributes = source.find(j.JSXAttribute).filter(path => {
    return path.value.name.name === 'css'
  })

  cssAttributes
    .find(j.JSXIdentifier)
    .replaceWith(() => j.jsxIdentifier('className'))

  cssAttributes
    .find(j.ArrayExpression)
    .replaceWith(element =>
      j.callExpression(j.identifier('tw'), element.value.elements),
    )

  cssAttributes
    .find(j.TaggedTemplateExpression)
    .filter(element => element.value.tag.name === 'tw')
    .replaceWith(element => j.templateLiteral(element.value.quasi.quasis, []))

  return source.toSource()
}

module.exports.parser = 'tsx'
