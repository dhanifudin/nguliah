'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');
const del = require('del');
const sequence = require('run-sequence');
const argv = require('yargs').argv;

const paths = {
  js: [
    'src/js/*.js'
  ],
  less: [
    'src/less/*.less'
  ],
  dest: {
    css: './assets/css/',
    js: './assets/js/'
  }
};

gulp.task('js', () => {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('less', () => {
  return gulp.src(paths.less)
    .pipe(plugins.less())
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('default', () => {
});
