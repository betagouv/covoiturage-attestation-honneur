module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|pdf)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
