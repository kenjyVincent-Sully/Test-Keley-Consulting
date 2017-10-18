// Stock l'objet gulp
var gulp = require('gulp');
// Stock l'objet sass
var sass = require('gulp-sass');
// Permet d'ajouter des prefixes en css 
// ex : transform: scale(2) =-moz-transform: scale(2);-webkit-transform: scale(2);
var autoprefixer = require('gulp-autoprefixer');
// Generate CSS Sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// Merge JS Files
var useref = require('gulp-useref');
// Add if support
var gulpif = require('gulp-if');
// Minify JS
var uglify = require('gulp-uglify');
// Minify CSS
var minifyCSS = require('gulp-minify-css');
//Minify Images
var imagemin = require('gulp-imagemin');
// Add image minify in cache
var cache = require('gulp-cache');
// Clear cache
var del = require('del');
// Refresh browser on save
var browserSync = require('browser-sync');
// Get error information with uglify
var gutil = require('gulp-util');
// Call function in order
var runSequence = require('run-sequence');

//show sass error 
var sassOption = {
    errLogToConsole: true, 
	outputStyle: 'expanded'
};

//Compile SCSS files
// Permet de creer une tache(ressemble a une fonction) le premier parametre est le nom de la tache
// et permet d'etre appeler dans la console ex gulp sass
gulp.task('sass', function() {
	return gulp.src('dev/css/scss/*.scss')
	//.pipe(sourcemaps.init())
	.pipe(autoprefixer())
	//.pipe(sourcemaps.write('maps'))
	.pipe(sass(sassOption).on('error', sass.logError))
	.pipe(gulp.dest('dev/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//Copy CSS sourcemaps from dev to web folder
gulp.task('cssmaps', function(){
  return gulp.src('dev/css/maps/**/*')
    .pipe(gulp.dest('web/css/maps'));
});

//Read HTML file to merge CSS and JS than minify them
gulp.task('useref', function(){

  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(sourcemaps.init())
    .pipe(gulpif('*.css', minifyCSS({shorthandCompacting:false}).on('error', gutil.log)))
    .pipe(gulpif('*.js', uglify().on('error', gutil.log)))
    .pipe(gulpif('*.css',sourcemaps.write('css/maps')))
    .pipe(gulpif('*.js',sourcemaps.write('js/maps')))
    .pipe(gulp.dest('web'));
});

//Compresses images
gulp.task('images', function(){
  return gulp.src('dev/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('web/img'));
});

//Copy Anims from dev to web folder
gulp.task('anim', function(){
  return gulp.src('dev/anim/**/*')
    .pipe(gulp.dest('web/anim'));
});

//Copy fonts from dev to web folder
gulp.task('font', function(){
  return gulp.src('dev/font/**/*')
    .pipe(gulp.dest('web/font'));
});

gulp.task('backend', function(){
  return gulp.src('dev/backend/**/*')
    .pipe(gulp.dest('web/backend'));
});

//Delete web folder
gulp.task('clean', function(callback){
  del('web');
  return cache.clearAll(callback);
});

//Clear Web folder and keep images already generated
gulp.task('clean:web', function(callback){
  return del(['web/**/*', '!web/img', '!web/img/**/*'], callback);
});

// Permet de rafraichir la page des modification du sass
gulp.task('browserSync', function() {
	browserSync({
		proxy: 'http://127.0.0.1/keleyconsulting/dev/index.html'
	})
});

// Permet d'observer chaque modification dans les ficher .scss
// en cas de changement la tache sass sera appeler
gulp.task('watch',function() {
	gulp.watch('dev/css/scss/*.scss',['sass']);
	gulp.watch('dev/*.html', browserSync.reload);
	gulp.watch('dev/js/*.js', browserSync.reload);
});

//Run sequence to build web folder
gulp.task('build', function(callback){
  runSequence('clean:web', 'sass', ['useref', 'images', 'anim', 'font', 'backend'], callback);
});

// Cette tache s'appel default permet d'etre lancé en tapant la commande gulp
// les tache entre crochet permet de lancer en même temps
gulp.task('default', function(callback){
	runSequence(['browserSync','watch'],callback);
});