const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const port = process.env.PORT || 3001;

gulp.task('server', () => {
    const app = require('./app');
    app.listen(port, () => console.log('Working ....'));
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'server.js'
    })
});