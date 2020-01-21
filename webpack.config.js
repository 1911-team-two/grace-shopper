const isDev = process.env.NODE_ENV === 'development'
const GoogleFontsPlugin = require('google-fonts-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new GoogleFontsPlugin({
      fonts: [
        {
          family: 'Open Sans',
          variants: [
            '300',
            '300i',
            '400',
            '400i',
            '600',
            '600i',
            '700',
            '700i',
            '800',
            '800i'
          ],
          subsets: ['latin']
        }
      ],
      filename: 'google-fonts.css',
      formats: ['ttf', 'woff', 'woff2', 'eot']
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ttf)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  }
}
