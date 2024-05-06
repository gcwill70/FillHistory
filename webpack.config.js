const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const tailwindConfig = require("./tailwind.config.js");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: devMode ? "development" : "production",
  devtool: "source-map",
  entry: {
    content: path.resolve(__dirname, "src/extension/content/index.tsx"),
    popup: path.resolve(__dirname, "src/extension/popup/index.tsx"),
    background: path.resolve(__dirname, "src/extension/background/index.ts"),
    premium: path.resolve(__dirname, "src/extension/premium/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
              sourceMap: devMode,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: devMode,
              postcssOptions: {
                plugins: {
                  tailwindcss: tailwindConfig,
                  autoprefixer: {},
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
  ],
  optimization: {
    minimize: !devMode,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: !devMode,
          },
        },
      }),
    ],
  },
};
