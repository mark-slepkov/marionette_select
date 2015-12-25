/**
 * Created by mark on 24.12.15.
 */
var webpack = require('webpack');
module.exports = {
    //watch: true,
    entry: 'example/js/init',
    output: {
        path: "example/js/",
        publicPath: 'example/js/',
        filename: 'build.js',
        library: 'jquery'
    },
    resolve: {
        modulesDirectories: ['', 'dist', 'bower_components'],
        // extensions: ['.js'],
        alias: {
            marionette: 'backbone.marionette'
        }
    },
    devtool: "source-map",
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({
        //    warnings: false,
        //    drop_console: true,
        //    unsafe: true
        //})
        new webpack.ResolverPlugin([
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
            ],
            ["normal", "loader"]
        )
    ]
};