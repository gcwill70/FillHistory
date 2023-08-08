const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    content: [path.resolve(__dirname, "..", "src", "core", "content.tsx")],
    background: path.resolve(__dirname, "..", "src", "core", "background.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
  ],
  optimization: {
    minimize: false,
  },
};
