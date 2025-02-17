import config from './rollup.config'

export default config({
  output: {
    file: 'dist/turndown-ref.js',
    format: 'iife',
    name: 'TurndownService'
  },
  browser: true
})
