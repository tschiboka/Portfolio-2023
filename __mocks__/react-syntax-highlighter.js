const React = require('react')

const SyntaxHighlighter = (props) =>
    React.createElement('pre', { 'data-testid': 'syntax-highlighter' }, props.children)

module.exports = SyntaxHighlighter
module.exports.default = SyntaxHighlighter
module.exports.Prism = SyntaxHighlighter
module.exports.Light = SyntaxHighlighter
