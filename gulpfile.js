const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const port = process.env.PORT || 3001;

gulp.task('server', () => {
    const app = require('./server');
    //app.listen(port, () => console.log('Working ....'));
});

// gulp.task('dev', ['server'], () => {
//     return nodemon({
//         ext: 'js',
//         tasks: ['server'],
//         script: 'server.js'
//     })
// });

gulp.task('dev', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
