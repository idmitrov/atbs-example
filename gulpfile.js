(() => {
    'use strict';
    const gulp = require('gulp');
    const browserSync = require('browser-sync').create();
    const sourcemaps = require('gulp-sourcemaps');
    const prefixer = require('gulp-autoprefixer');
    const concat = require('gulp-concat');
    const eslint = require('gulp-eslint');
    const stylus = require('gulp-stylus');
    const stylusOptions = {
        compress: false,
    };

    // SERVE
    gulp.task('serve', () => {
        browserSync.init({
            server: {
                baseDir: './dist',
            },
        });
    });

    // LINT
    gulp.task('lint', () => {
        // ESLint ignores files with "node_modules" paths.
        // So, it's best to have gulp ignore the directory as well.
        // Also, Be sure to return the stream from the task;
        // Otherwise, the task may end before the stream has finished.
        return gulp
            .src([
                './src/**/*.js',
                '!node_modules/**',
            ])
            // eslint() attaches the lint output to the "eslint" property
            // of the file object so it can be used by other modules.
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failAfterError last.
            .pipe(eslint.failAfterError());
    });

    // SCRIPTS
    gulp.task('scripts', () => {
        gulp
            .src('./src/scripts/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(browserSync.stream());
    });

    // STYLES
    gulp.task('styles', () => {
        gulp
            .src('./src/styles/main.styl')
            .pipe(sourcemaps.init())
            .pipe(stylus(stylusOptions).on('error', (e) => {
                console.log(e);
            }))
            .pipe(prefixer({
                browsers: ['last 2 versions'],
                cascade: false,
            }))
            .pipe(concat('main.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./dist/css'))
            .pipe(browserSync.stream());
    });

    // WATCH
    gulp.task('watch', () => {
        gulp.watch('./src/styles/**/*.styl', [
            'styles',
        ]);

        gulp.watch('./src/scripts/**/*.js', [
            'lint',
            'scripts',
        ]);
    });

    gulp.task('default', [
        'serve',
        'lint',
        'styles',
        'scripts',
        'watch',
    ]);
})();
