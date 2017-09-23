const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');

const port = process.env.PORT || 3001;

gulp.task('server', () => {
    const app = require('./server');
});

gulp.task('dev', function (cb) {
	var started = false;
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('compile:sass', () => {
    return gulp.src('static/sass/styles.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('static/css'));
})

gulp.task('sass', function (){
    gulp.watch('static/sass/styles.sass', ['compile:sass']);
})
