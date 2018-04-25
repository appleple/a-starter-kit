/**
 *  *1・*2 gulp-csscombとgulp-sourcemaps は、gulp-csscombがgulp-sourcemapsに対応していないので、同時に動作することができません。
 *  gulp-csscombを動作させたい場合は、「*2」の記述をコメントアウトしてください。
 */
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const path = require('path');
const fs = require('fs-extra');
const cssnano = require('gulp-cssnano');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const replace = require('gulp-replace');
const package = require('./package.json');
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
  fs.copy('node_modules/font-awesome/fonts', `themes/${rootTheme}/fonts`);
  gulp.watch(`themes/${rootTheme}/src/scss/**`, ['sass']);
});


// デフォルトのタスク
gulp.task('default', ['project']);
