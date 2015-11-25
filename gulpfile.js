var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/* BrowserSync */
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
});

/* HTML */
gulp.task('jade', function() {
	return gulp.src([
		'./src/**/*.jade'
	])
	.pipe(plumber())
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('./public'));	
});

/* CSS */
gulp.task('sass', function() {
	return gulp.src([
		'./src/sass/app.scss' //pull files from src
	])
	.pipe(plumber())
	.pipe(sass({
		includePaths: [
			'./bower_components/foundation/scss' // include foundation
		]
	})) // compile through gulp-sass
	.pipe(concat('app.css')) // rename
	.pipe(gulp.dest('./public/css')); // deposit
});

/* BUILD */
gulp.task('build', ['jade', 'sass']);

/* SERVE */
gulp.task('serve', ['build', 'browser-sync'], function() {
	gulp.watch('./src/sass/**/*.scss', ['sass', reload]); //every time something changes in a, run b
	gulp.watch('./src/**/*.jade', ['jade', reload]);
});

gulp.task('default', ['serve']);