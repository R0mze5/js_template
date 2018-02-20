const gulp = require('gulp');

// ----------   bower   ----------
const mainBowerFiles = require('main-bower-files');

// ----------   operations with files   ----------
const concat = require('gulp-concat');
const rename = require('gulp-rename');

const browserSync = require('browser-sync'); 

// ----------   operations with styles   ----------
const lesshint = require('gulp-lesshint');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
/*const gulp-uncss = require('gulp-uncss');*/


// ----------   operations with scripts   ----------
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const uglify = require('gulp-uglifyjs');


// ----------   operations with images   ----------
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');




const mainPath = '/';
const bitrixPath = '/local/templates/website/';

const choosePath = mainPath;

const srcPath = '.'+choosePath;
const distPath = choosePath;


gulp.task('default', ['watch'])



/*---------------------------------------------------------------------------*
 * sync
 *---------------------------------------------------------------------------*/


gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: './'
		},
		/*proxi: "http:/site.ru/",*/
		notify: false
	})
})




gulp.task('watch', ['bowercss', 'bowerjs','css', /*'es6',*/ 'browser-sync'], function() {
	gulp.watch(srcPath+'less/*.less', ['css']);
	/*gulp.watch(srcPath+'es6/*.js', ['es6']);*/

	gulp.watch(srcPath+'js/*.js', browserSync.reload);
	gulp.watch('./**/*.html', browserSync.reload);
})

/*---------------------------------------------------------------------------*
 * ./sync
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * styles
 *---------------------------------------------------------------------------*/

gulp.task('bowercss', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
       	.pipe(gulp.dest(srcPath+'css/vendors/'))
});

gulp.task('less', function(success, error) {
	return gulp
		.src(srcPath+'less/*.less')
		.pipe(lesshint({
	        }))
	    /*.pipe(lesshint.reporter())*/
	    .pipe(lesshint.failOnError())
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 11'], {cascade: true}))
		.pipe(gulp.dest(srcPath+'css'))
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(srcPath+'css'));
		// .pipe(browserSync.reload({stream: true}));
})

gulp.task('css',['less'], function(success, error) {
	return gulp
		.src([srcPath+'css/vendors/*.css', srcPath+'fonts/**/*-light.css', srcPath+'css/main.css' ])
		.pipe(concat('common.css'))
		.pipe(gulp.dest(srcPath+'css'))
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(srcPath+'css'));
})

/*---------------------------------------------------------------------------*
 * ./styles
 *---------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------*
 * js
 *---------------------------------------------------------------------------*/

gulp.task('bowerjs', function(success, error) {
    return gulp.src(mainBowerFiles('**/*.js'))
       	.pipe(gulp.dest(srcPath+'js/vendors/'))
});

gulp.task('js', function(success, error) {
	return gulp
		.src(srcPath+'js/vendors/*.js')
		.pipe(concat('common.js'))
		.pipe(gulp.dest(srcPath+'js'))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))	
		.pipe(gulp.dest(srcPath+'js'))
})



gulp.task('es6', ['js'], function(success, error) {
	return gulp
		.src(srcPath+'es6/*.js')
		.pipe(babel())	
		/*.pipe(eslint())	
		.pipe(eslint.format())*/
		.pipe(concat('main.js'))
		.pipe(gulp.dest(srcPath+'js'))
		.pipe(minify({
	        ext:{
	            src:'-debug.js',
	            min:'.js'
	        },
	        exclude: ['tasks'],
	        ignoreFiles: ['.combo.js', '-min.js']
	    }))
		.pipe(rename({
			suffix: '.min'
		}))	
		.pipe(gulp.dest(srcPath+'js'))
	
})

/*---------------------------------------------------------------------------*
 * ./js
 *---------------------------------------------------------------------------*/
