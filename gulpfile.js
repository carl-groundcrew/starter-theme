// Project Configuration 
var name = 'Ellies';
var url = 'http://ellies.test';


// Plugins

var gulp = require( 'gulp' );
var browserSync = require( 'browser-sync' ).create();
var sass = require( 'gulp-ruby-sass' );
var minifycss    = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var include = require( 'gulp-include' );
var clean = require('gulp-clean');


gulp.task('default', async function() {
  console.log("HTTP Server Started");
});

// Sass compiling task

gulp.task( 'sass', async function() {
    return sass( 'static/scss/*.scss' )
        .on( 'error', sass.logError )
        .pipe(minifycss())
        .pipe( gulp.dest( './' ) )
        .pipe( browserSync.stream() );
} );

// Script compiling task

gulp.task("scripts", async function() {
    gulp.src(['./static/js/scripts.js'])
        .pipe(include())
        .pipe(uglify())
        .pipe( gulp.dest("./") )
});

// Browser Sync task

gulp.task( 'watch', function() {
    browserSync.init( {
        files: [ './**/*.php', '*.php',  'style.css' ],
        proxy: url,
    } );
    gulp.watch( './static/scss/*.scss', gulp.series('sass') );
    gulp.watch('./static/scss/**/*.scss', gulp.series('sass') );
    gulp.watch('./static/js/*.js', gulp.series('scripts') );
    gulp.watch('./static/js/main/*.js',  gulp.series('scripts') );
} );

gulp.task('clean', function () {
    return gulp.src('node_modules', {read: false})
        .pipe(clean());
}); 