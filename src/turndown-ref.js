import COMMONMARK_RULES from './commonmark-rules'
import Rules from './rules'
import { extend, trimLeadingNewlines, trimTrailingNewlines } from './utilities'
import RootNode from './root-node'
import Node from './node'
const reduce = Array.prototype.reduce
const escapes = [
  [/\\/g, '\\\\'],
  [/\*/g, '\\*'],
  [/^-/g, '\\-'],
  [/^\+ /g, '\\+ '],
  [/^(=+)/g, '\\$1'],
  [/^(#{1,6}) /g, '\\$1 '],
  [/`/g, '\\`'],
  [/^~~~/g, '\\~~~'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/^>/g, '\\>'],
  [/_/g, '\\_'],
  [/^(\d+)\. /g, '$1\\. ']
]

export default function TurndownService (options) {
  if (!(this instanceof TurndownService)) return new TurndownService(options)

  const defaults = {
    rules: COMMONMARK_RULES,
    headingStyle: 'setext',
    hr: '* * *',
    bulletListMarker: '*',
    codeBlockStyle: 'indented',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
    br: '  ',
    preformattedCode: false,
    blankReplacement: function (content, node) {
      return node.isBlock ? '\n\n' : ''
    },
    keepReplacement: function (content, node) {
      return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
    },
    defaultReplacement: function (content, node) {
      return node.isBlock ? '\n\n' + content + '\n\n' : content
    }
  }
  this.options = extend({}, defaults, options)
  this.rules = new Rules(this.options)
}

TurndownService.prototype = {
  /**
   * The entry point for converting a string or DOM node to Markdown
   * @public
   * @param {String|HTMLElement} input The string or DOM node to convert
   * @returns {String} A Markdown representation of the input
   */

  turndown: function (input) {
    if (!canConvert(input)) {
      throw new TypeError(
        input + ' is not a string, or an element/document/fragment node.'
      )
    }

    if (input === '') return ''

    const output = process.call(this, new RootNode(input, this.options))
    return postProcess.call(this, output)
  },

  /**
   * Add one or more plugins
   * @public
   * @param {Function|Array<Function>} plugin The plugin or array of plugins to add
   * @returns {TurndownService} The Turndown instance for chaining
   */

  use: function (plugin) {
    if (Array.isArray(plugin)) {
      for (let i = 0; i < plugin.length; i++) this.use(plugin[i])
    } else if (typeof plugin === 'function') {
      plugin(this)
    } else {
      throw new TypeError('plugin must be a Function or an Array of Functions')
    }
    return this
  },

  /**
   * Adds a rule
   * @public
   * @param {String} key The unique key of the rule
   * @param {Object} rule The rule
   * @returns {TurndownService} The Turndown instance for chaining
   */

  addRule: function (key, rule) {
    this.rules.add(key, rule)
    return this
  },

  /**
   * Keep a node (as HTML) that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns {TurndownService} The Turndown instance for chaining
   */

  keep: function (filter) {
    this.rules.keep(filter)
    return this
  },

  /**
   * Remove a node that matches the filter
   * @public
   * @param {String|Array|Function} filter The unique key of the rule
   * @returns {TurndownService} The Turndown instance for chaining
   */

  remove: function (filter) {
    this.rules.remove(filter)
    return this
  },

  /**
   * Escapes Markdown syntax
   * @public
   * @param {String} string The string to escape
   * @returns {String} A string with Markdown syntax escaped
   */

  escape: function (string) {
    return escapes.reduce(function (accumulator, escape) {
      return accumulator.replace(escape[0], escape[1])
    }, string)
  }
}

/**
 * Reduces a DOM node down to its Markdown string equivalent
 * @private
 * @param {HTMLElement} parentNode The node to convert
 * @returns {String} A Markdown representation of the node
 */

function process (parentNode) {
  const self = this
  return reduce.call(parentNode.childNodes, function (output, node) {
    node = new Node(node, self.options)

    let replacement = ''
    if (node.nodeType === 3) {
      replacement = node.isCode ? node.nodeValue : self.escape(node.nodeValue)
    } else if (node.nodeType === 1) {
      replacement = replacementForNode.call(self, node)
    }

    return join(output, replacement)
  }, '')
}

/**
 * Appends strings as each rule requires and trims the output
 * @private
 * @param {String} output The conversion output
 * @returns {String} A trimmed version of the output
 */

function postProcess (output) {
  const self = this
  this.rules.forEach(function (rule) {
    if (typeof rule.append === 'function') {
      output = join(output, rule.append(self.options))
    }
  })

  return output.replace(/^[\t\r\n]+/, '').replace(/[\t\r\n\s]+$/, '')
}

/**
 * Converts an element node to its Markdown equivalent
 * @private
 * @param {HTMLElement} node The node to convert
 * @returns {String} A Markdown representation of the node
 */

function replacementForNode (node) {
  const rule = this.rules.forNode(node)
  let content = process.call(this, node)
  const whitespace = node.flankingWhitespace
  if (whitespace.leading || whitespace.trailing) content = content.trim()
  return (
    whitespace.leading +
    rule.replacement(content, node, this.options) +
    whitespace.trailing
  )
}

/**
 * Joins replacement to the current output with appropriate number of new lines
 * @private
 * @param {String} output The current conversion output
 * @param {String} replacement The string to append to the output
 * @returns {String} Joined output
 */

function join (output, replacement) {
  const s1 = trimTrailingNewlines(output)
  const s2 = trimLeadingNewlines(replacement)
  const nls = Math.max(output.length - s1.length, replacement.length - s2.length)
  const separator = '\n\n'.substring(0, nls)

  return s1 + separator + s2
}

/**
 * Determines whether an input can be converted
 * @private
 * @param {String|HTMLElement} input The input to check
 * @returns {Boolean} True if the input can be converted, false otherwise
 */

function canConvert (input) {
  return (
    input != null && (
      typeof input === 'string' ||
      (input.nodeType && (
        input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11
      ))
    )
  )
}
