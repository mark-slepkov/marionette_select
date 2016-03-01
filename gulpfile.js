/**
 * Created by mark on 23.12.15.
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var gutil = require("gulp-util");
var webpack = require("webpack");

var paths = {
    stylus: {
        src: 'src/marionette_ui/**/*.styl',
        dest: 'dist/marionette_ui/'
    },
    coffee: {
        src: 'src/marionette_ui/**/*.coffee',
        dest: 'dist/marionette_ui/'
    },
    html: {
        src: 'src/marionette_ui/**/*.html',
        dest: 'dist/marionette_ui/'
    },
    css: {  // For the example
        src: 'dist/marionette_ui/**/*.css',
        dest: 'example/css'
    },
    js:{
        src: {
            entry: "example/js/init.js",
            compiled: "dist/marionette_ui/**.js"
        }
    }
};

gulp.task('coffee', function(){
    gulp.src(paths.coffee.src).pipe(coffee()).pipe(gulp.dest(paths.coffee.dest))
});

gulp.task('stylus', function(){
    gulp.src(paths.stylus.src).pipe(stylus()).pipe(gulp.dest(paths.stylus.dest)).pipe(concat('style.css')).pipe(gulp.dest(paths.css.dest))
});

gulp.task('html', function(){
    gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest))
});


//var WebpackDevServer = require("webpack-dev-server");

gulp.task('webpack', function(callback){
    webpack({
        // config here
        //watch: true,
        entry: paths.js.src.entry,
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
            new webpack.optimize.UglifyJsPlugin({
                warnings: false,
                drop_console: true,
                unsafe: true
            }),
            new webpack.ResolverPlugin([
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
                ],
                ["normal", "loader"]
            )
        ]
    },
    function(err, stats){
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback()
    })
});

gulp.task('watch', function() {
    gulp.watch([paths.stylus.src], ['stylus']);
    gulp.watch([paths.html.src], ['html']);
    gulp.watch([paths.coffee.src], ['coffee', 'webpack']);
    //gulp.watch([paths.js.src.compiled, paths.js.src.entry], ['webpack']);
});
gulp.task("build", ['coffee', 'stylus', 'html', 'webpack']);
gulp.task("default", ['build']);