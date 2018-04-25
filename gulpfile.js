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

//テーマ
//SCSSファイルをCSSにコンパイルする
gulp.task('sass', () => {
  gulp.src([`themes/${rootTheme}/src/scss/site.scss`])
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9'],
      cascade: false
    }))
    .pipe(csscomb())// *1
    .pipe(rename({
      basename: 'bundle'
    }))
    .pipe(gulp.dest(`themes/${rootTheme}/dest`))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano({ safe: true }))
    .pipe(gulp.dest(`themes/${rootTheme}/dest`));
});


// プロジェクトのSCSSとCSSファイルを監視する
gulp.task('project', () => {
  gulp.watch(`themes/${rootTheme}/src/scss/**`, ['sass']);
});


// デフォルトのタスク
gulp.task('default', ['project']);
