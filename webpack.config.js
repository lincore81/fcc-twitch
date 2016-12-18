"use strict";
const path = require('path'),
      srcPath = path.resolve(__dirname, 'src'),
      distPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: srcPath,
    entry: path.resolve(srcPath, 'main.js'),
    output: {
        path: path.resolve(distPath, 'js'),
        filename: `bundle.js`
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                cacheable: true,
                include: srcPath,
                loader: 'babel-loader',
                query: {
                    //retainLines: true,
                    //cacheDirectory: true
                }
            }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'eval-source-map'
};



