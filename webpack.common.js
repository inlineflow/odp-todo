const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.svg$/i,
                loader: 'svg-inline-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/i,
                type: "asset/resource",
                generator: {
                filename: 'assets/fonts/[name][ext][query]',
                },
            },
        ],
    },
};