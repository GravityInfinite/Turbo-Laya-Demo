const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    "turbo-ts.min": {
      import: "./src/index.js",
      library: {
        type: "window",
        name: "turbo",
      },
    },
    "turbo.min": {
      import: "./src/index.js",
      library: {
        type: "commonjs-module",
      },
    },
  },
  output: {
    libraryExport: "default",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    // library: {
    //   type: "commonjs-module",
    // },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, //不转换的文件
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
  },
};
