gulp  = require 'gulp'
gutil = require 'gulp-util'
coffee= require 'gulp-coffee'
verb  = require 'gulp-verb'
mocha = require 'gulp-mocha'
literature = require 'gulp-literature'

# Verb makes it dead simple to generate markdown documentation,
# using simple templates, with zero configuration required.
# A project without documentation is like a project that doesn't exist.
gulp.task 'docs', ->
  gulp.src ['.verbrc.md']
    .pipe verb dest:'README.md'
    .pipe gulp.dest './'

gulp.task 'test', ['compile'], ->
  gulp.src './test/*.{js,coffee,litcoffee}'
  .pipe mocha()

gulp.task 'compile', ->
  gulp.src './src/gulp-literature.litcoffee'
    .pipe coffee bare:true
      .on 'error', gutil.log
    .pipe gulp.dest './'

gulp.task 'default', ['compile','test','docs']