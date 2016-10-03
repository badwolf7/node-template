const gulp = require('gulp');

// CSS
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');

// images
const imagemin = require('gulp-imagemin');

// javascript
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

// live update
const livereload = require('gulp-livereload');

// utility
const changed = require('gulp-changed');
const next = require('gulp-next');
const sourcemaps = require('gulp-sourcemaps');
const colors = require('colors');

const dirs = {
  src: {
    css: "./src/css/**/*.css",
    img: "./src/img/**/*.*",
    js: "./src/js/**/*.js",
    scss: {
      all: "./src/scss/**/*.scss",
      main: "./src/scss/main.scss"
    },
    svg: "./src/svg/**/*.svg"
  },
  public: {
    css: "./public/css",
    img: "./public/img",
    js: "./public/js",
    svg: "./public/svg"
  }
}

gulp.task('scss', () => {
  gulp.src(dirs.src.scss.main)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.css))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.css))
    .pipe(livereload())
    .pipe(next(() => {
      console.log('\n Finished SCSS'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('css', () => {
  gulp.src(dirs.src.css)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.css))
      .pipe(minifyCss({
        compatibility: 'ie7'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.css))
    .pipe(livereload())
    .pipe(next(() => {
      console.log('\n Finished CSS'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('javascript', () => {
  gulp.src(dirs.src.js)
    .pipe(sourcemaps.init())
      .pipe(changed(dirs.public.js))
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.public.js))
    .pipe(livereload())
    .pipe(next(() => {
      console.log('\n Finished JavaScript'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('images', () => {
  // Images
  // jpg, png, gif  =>  all others ignored
  return gulp.src(dirs.src.img)
    .pipe(changed(dirs.public.img))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(dirs.public.img))
    .pipe(livereload())
    .pipe(next(() => {
      console.log('\n Finished Images'.bgGreen.black.bold);
      console.log('\n');
    }));
});

gulp.task('svg', () => {
  return gulp.src(dirs.src.svg)
    .pipe(changed(dirs.public.svg))
    .pipe(imagemin({
      multipass: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(dirs.public.svg))
    .pipe(livereload())
    .pipe(next(() => {
      console.log('\n Finished SVG'.bgGreen.black.bold);
      console.log('\n');
    }));
});


gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(dirs.src.scss.all, ['scss']);
  gulp.watch(dirs.src.css, ['css']);
  gulp.watch(dirs.src.js, ['javascript']);
  gulp.watch(dirs.src.img, ['images']);
  gulp.watch(dirs.src.svg, ['svg']);

  console.log('\n Watching Files...'.bgGreen.black.bold);
  console.log('\n');
});

gulp.task('default', ['scss','css','javascript','images','svg'], () => {
  gulp.start('watch');
});