/**
 *  *1・*2 gulp-csscombとgulp-sourcemaps は、gulp-csscombがgulp-sourcemapsに対応していないので、同時に動作することができません。
 *  gulp-csscombを動作させたい場合は、「*2」の記述をコメントアウトしてください。
 */

const gulp = require('gulp');
const rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    path = require('path'),
    cssnano = require('gulp-cssnano'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    replace = require('gulp-replace'),
    package = require('./package.json');

const rootTheme = package.config.theme;

//SCSSファイルをCSSにコンパイルする
gulp.task('acmssass', function () {
    gulp.src(['themes/' + rootTheme + '/scss/foundation/acms/acms.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie 9'],
            cascade: false,
            remove: false
        }))
        .pipe(csscomb())// *1
        .pipe(gulp.dest('themes/' + rootTheme + '/css'));
});
// SCSSファイルを圧縮する
gulp.task('acmsmin', function () {
    gulp.src(['themes/' + rootTheme + '/scss/foundation/acms/acms.scss'])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie 9'],
            cascade: false,
            remove: false
        }))
        .pipe(csscomb())// *1
        .pipe(cssnano({safe: true}))
        .pipe(gulp.dest('themes/' + rootTheme + '/css'));
});

//テーマ
//SCSSファイルをCSSにコンパイルする
gulp.task('sass', function () {
    gulp.src(['themes/' + rootTheme + '/scss/site.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(csscomb())// *1
        .pipe(rename({
            basename: 'bundle'
        }))
        .pipe(gulp.dest('themes/' + rootTheme + '/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano({safe: true}))
        .pipe(gulp.dest('themes/' + rootTheme + '/css'));
});


// プロジェクトのSCSSとCSSファイルを監視する
gulp.task('project', function() {
    gulp.watch('themes/' + rootTheme + '/scss/**',['sass']);
});

gulp.task('acms', function() {
    gulp.watch('themes/' + rootTheme + '/scss/foundation/acms/**',['acmssass']);
    gulp.watch('themes/' + rootTheme + '/css/acms.css',['acmsmin']);
});

// デフォルトのタスク
gulp.task('default', ['project','acms']);
