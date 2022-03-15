const { webpackConfig, merge } = require('shakapacker');
const webpack = require('webpack');
const path = require('path');

const htmlErb = require('./modules/html_erb');
const js = require('./modules/js');
const jsErb = require('./modules/js_erb');
const sass = require('./modules/sass');
const sassErb = require('./modules/sass_erb');
const html = require('./modules/html');
const uiTour = require('./modules/ui-tour');

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const customConfig = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash',
      Hone: 'hone',
      Tether: 'tether',
      Holder: 'holderjs',
      'window.CodeMirror': 'codemirror',
      MediumEditor: 'medium-editor',
      Humanize: path.resolve(path.join(__dirname, '../../app/frontend/src/javascript/lib/humanize.js')),
      moment: 'moment',
      Application: [path.resolve(path.join(__dirname, '../../app/frontend/src/javascript/app.js')), 'Application']
    })
  ],
  module: {
    rules: [
      jsErb,
      htmlErb,
      sassErb,
      js,
      html,
      sass,
      uiTour
    ]
  },
  resolve: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.ico',
      '.svg', '.eot', '.otf', '.ttf', '.woff', '.woff2',
      '.tsx', '.ts', '.erb', '.html', '.mjs', '.js', '.jsx',
      '.sass', '.scss', '.css', '.module.sass', '.module.scss', '.module.css'],
    fallback: {
      assert: false
    }
  }
};

module.exports = merge(webpackConfig, customConfig);
