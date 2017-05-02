'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');
const del = require('del');
const sequence = require('run-sequence');
const argv = require('yargs').argv;

const paths = {
  assets: {
    css: [
      'node_modules/shower-ribbon/styles/screen-16x10.css',
      'node_modules/highlightjs/styles/default.css',
    ],
    js: [
      'node_modules/shower-core/shower.min.js',
      'node_modules/highlightjs/highlight.pack.min.js',
    ],
    fonts: [
      'node_modules/shower-ribbon/fonts/*.woff',
    ],
    images: [
      'node_modules/shower-ribbon/images/*.*',
    ]
  },
  js: [
    'src/js/*.js'
  ],
  less: [
    'src/less/*.less'
  ],
  dest: {
    css: './assets/css/',
    js: './assets/js/',
    fonts: './assets/fonts/',
    images: './assets/images/',
  }
};

gulp.task('assets:js', () => {
  return gulp.src(paths.assets.js)
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('assets:css', () => {
  return gulp.src(paths.assets.css)
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('assets:fonts', () => {
  return gulp.src(paths.assets.fonts)
    .pipe(gulp.dest(paths.dest.fonts));
});

gulp.task('assets:images', () => {
  return gulp.src(paths.assets.images)
    .pipe(gulp.dest(paths.dest.images));
});

gulp.task('assets', ['assets:css', 'assets:js', 'assets:fonts', 'assets:images']);

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
