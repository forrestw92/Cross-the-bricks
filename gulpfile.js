const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minifier');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const debug = true;

gulp.task('copyFonts', () => {
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('tmp/fonts'));
});
gulp.task('copyHtml', () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('tmp'));
});
gulp.task('copyImages', () => {
    gulp.src('src/images/*')
        .pipe(gulp.dest('tmp/images'));
});
gulp.task('copyCSS', () => {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('tmp/css'));
});
gulp.task('copyScripts', () => {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('tmp/css'));
});
gulp.task('browserify', () => {
    const b = browserify({
        entries: 'src/js/app.js',
        extensions: ['es6'],
        insertGlobals: true,
        transform: ['babelify'],
        debug
    });
    return b.bundle()
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('clean:test', () => {
    return gulp.src('tmp/', {read: false})
        .pipe(clean());
});
gulp.task('clean:dist', () => {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});
gulp.task('build', () => {
    runSequence('clean:dist', ['browserify', 'copyHtml', 'copyFonts', 'copyImages', 'copyCSS'], () => {
        return gulp.src('tmp/**/*').pipe(minify({
            'minify': true,
            minifyHTML: {
                collapseWhitespace: true,
                conservativeCollapse: true,
            },
            minifyJS: {
                compress: {
                    drop_console: true,
                },
                sourceMap: false
            },
            minifyCSS: true
        })).pipe(gulp.dest('dist'));
    });
});


gulp.task('serve:test', () => {
    runSequence('clean:test', ['browserify', 'copyHtml', 'copyFonts', 'copyImages', 'copyCSS']);
    browserSync.init({
        server: './tmp'
    });
    gulp.watch('src/js/**/*.js').on('change', () => {
        runSequence('browserify', () => {
            browserSync.reload();
        });

    });
    gulp.watch('src/*.html').on('change', () => {
        runSequence('copyHtml', () => {
            browserSync.reload();
        });

    });
    gulp.watch('src/fonts/*').on('change', () => {
        runSequence('copyFonts', () => {
            browserSync.reload();
        });

    });
    gulp.watch('src/images/*').on('change', () => {
        runSequence('copyImages', () => {
            browserSync.reload();
        });

    });
    gulp.watch('src/css/*.css').on('change', () => {
        runSequence('copyCSS', () => {
            browserSync.reload();
        });
    });

});

gulp.task('serve:build', ['build'], () => {
    browserSync.init({
        server: './dist'
    });
});





