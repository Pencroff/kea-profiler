/**
 * Created by Pencroff on 11.12.2014.
 */

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');
var benchmark = require('gulp-bench');
var del = require('del');
var to5 = require('gulp-6to5');
var sourcemaps = require("gulp-sourcemaps");

var Gitdown = require('gitdown');

gulp.task('default', ['watch-mocha'], function() {
    // place code for your default task here
    console.log('gulp started');
});

gulp.task('clear-coverage', function(cb) {
    del([
        './coverage'
    ], cb);
});

gulp.task('clear-benchmark', function(cb) {
    del([
        './benchmark'
    ], cb);
});

gulp.task('clear::6to5', function (cb) {
    del([
        './lib'
    ], cb);
});

gulp.task('6to5', ['clear::6to5'], function () {
    return gulp.src('src/**')
        .pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(sourcemaps.write('.', {addComment: false}))
        .pipe(gulp.dest('lib'));
});

gulp.task('mocha', ['6to5'], function() {
    return gulp.src(['./test/*-test.js'], { read: false })
        .pipe(mocha({ reporter: 'list', compilers:'js:6to5/register' }));
});

gulp.task('watch-mocha', function() {
    gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('cover', ['clear-coverage'], function (cb) {
    gulp.src(['lib/*.js'])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(['./test/*-test.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports({reporters: [ 'lcov', 'text', 'text-summary', 'clover' ]})) // Creating the reports after tests runned
                .on('end', cb)
                .on('error', gutil.log);
        });
});

gulp.task('benchmark', ['clear-benchmark'], function () {
    gulp.src(['./test/*-benchmark.js'], {read: false})
        .pipe(benchmark({
            outputFormat: 'json'
        }))
        .pipe(gulp.dest('./benchmark'));
});

gulp.task('jsdocs', function() {
    //return gulp.src('./src/*.js')
    //    .pipe(jsdoc2md())
    //    .on('error', function(err){
    //        gutil.log(gutil.colors.red('jsdoc2md failed'), err.message)
    //    })
    //    .pipe(rename(function(path){
    //        path.extname = '.md';
    //    }))
    //    .pipe(gulp.dest('./documentation'));
});

gulp.task('readme', ['jsdocs'], function () {
    return Gitdown
        .read('./documentation/README.md')
        .write('README.md');
});