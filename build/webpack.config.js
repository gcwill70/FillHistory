const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwind = require("tailwindcss");
const TerserPlugin = require("terser-webpack-plugin");
const { debug } = require("console");

const devMode = !(process.env.NODE_ENV === "production");

module.exports = {
  mode: devMode ? "development" : "production",
  devtool: "source-map",
  entry: {
    content: [path.resolve(__dirname, "../src/extension/content/index.tsx")],
    background: path.resolve(__dirname, "../src/extension/background/index.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
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
                  tailwindcss: {},
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
