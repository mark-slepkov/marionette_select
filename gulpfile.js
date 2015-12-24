/**
 * Created by mark on 23.12.15.
 */

var gulp = require('gulp');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');
var paths = {
    stylus: {
        src: 'src/select/**/*.styl',
        dest: 'dist/select/'
    },
    coffee: {
        src: 'src/select/**/*.coffee',
        dest: 'dist/select/'
    },
    html: {
        src: 'src/select/**/*.html',
        dest: 'dist/select/'
    }
};

gulp.task('coffee', function(){
    gulp.src(paths.coffee.src).pipe(coffee()).pipe(gulp.dest(paths.coffee.dest))
});

gulp.task('stylus', function(){
    gulp.src(paths.stylus.src).pipe(stylus()).pipe(gulp.dest(paths.stylus.dest))
});



gulp.task('html', function(){
    gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest))
});

gulp.task("build", ['coffee', 'stylus', 'html']);
gulp.task("default", ['build']);