import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    main: path.resolve(__dirname, "src/index"),
    vendor: path.resolve(__dirname, "src/vendor"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "./src/assets/favicon.ico"
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.(s(c|a)ss)$/, use: ["style-loader", "css-loader", "sass-loader"] },
      {
        test: /\.(png|jpe?g|gif|mp4)$/,
        type: "asset/resource",
      },
      {
        test: /\.(mp3|wav|wma|ogg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'assets/audio/',
            publicPath: 'assets/audio/'
          }
        }
      },
    ],
  },
};
