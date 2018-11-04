"use strict";
// 'libs/jquery/dist/jquery.js'
var jsArr = [
    'src/js/scripts.js'
];

var devPath = 'src/';

var htmlPagesName = ['src/*.html'];

var lessFilesNames = ['src/less/main.less'];

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), //автопрефиксы
    livereload = require('gulp-livereload'), //авторефреш
    less = require('gulp-less'), //less
    cleancss = require('gulp-cleancss'), //минификация css
//        uncss = require('gulp-uncss'), //удаление не исползуемых стилей
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sourcemaps = require('gulp-sourcemaps'),
    csso = require('gulp-csso'),
    cssBase64 = require('gulp-css-base64'),
    rimraf = require('rimraf'), //для очищения папок
    rigger = require('gulp-rigger'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('clean', function (cb) {
    rimraf('dist', cb);
});

gulp.task('js', function (cb) {
    pump([
            gulp.src(jsArr),
            //        uglify(),
            gulp.dest('dist/js/')
        ],
        cb
    );
});

gulp.task('html', function () {
    gulp.src(htmlPagesName)
        .pipe(rigger()) //Прогоним через rigger
        .pipe(connect.reload())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('img', function () {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}

gulp.task('css', function () {
    return gulp.src(lessFilesNames)
        .pipe(sourcemaps.init())
        .pipe(less().on('error', swallowError))
        .pipe(autoprefixer({
            browsers: ['last 20 versions']
        }))
        .pipe(csso({
            restructure: true,
            sourceMap: true,
            debug: false
        }))
        .pipe(cleancss({keepBreaks: false}))
        .pipe(sourcemaps.write())
        .pipe(cssBase64())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/img/*', ['img']);
    gulp.watch(['src/**/*.less'], ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/fonts/*', ['fonts']);
    gulp.watch([htmlPagesName, 'src/**/*.html'], ['html']);
});

gulp.task('default', ['connect', 'html', 'css', 'img', 'js', 'fonts', 'watch']);
