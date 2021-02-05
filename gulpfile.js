'use strict';

var webp = require('gulp-webp');

// Json data importing
var fs = require('fs');
var chalk = require('chalk');
var fancyLog = require('fancy-log');

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-cssnano'),
  rename      = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  svgstore = require('gulp-svgstore'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-minify'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  changed = require('gulp-changed'),
  concat = require('gulp-concat-util'),
  pump = require('pump'),
  shell = require('gulp-shell'),
  replace = require('gulp-replace'),
  browserSync = require('browser-sync').create(),
  critical = require('critical'),
  reload = browserSync.reload,
  paths = {
    sass: ['./src/sass/**/*.scss'],
    imgs: ['./src/imgs/**/*'],
    videoExternals: ['./src/videos/**/*'],
    svgs: ['./src/svgs/**/*.svg'],
    animations: ['./src/animations/**/*.json'],
    vendor: ['./src/vendor/**/*.js'],
    require_config: ['./src/js/require/(main|config).js'],
    app_js: ['./src/js/app/**/*'],
    jsexternals: ['./src//js/jsexternals/**/*'],
    function_js: ['./src/js/function_definitions/**/*'],
    fonts: ['./src/fonts/**/*'],
    vue_js: ['./src/js/vue/**/*'],
    templates: ['./templates/**/*']
  },
  onError = function(err) {
    console.log(chalk.red(err.message));
  }

const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies']
});
// package vars
const pkg = require('./package.json');


gulp.task('sass', function() {
  var processors = [
    autoprefixer
  ];
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./web/css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./web/css'))
    //.pipe(browserSync.reload({stream: true}))
    .pipe(browserSync.stream())
});

// adds BrowserSync for web dev

gulp.task('serve', function() {
  browserSync.init({
      //files: paths.sass,
      proxy: "https://localhost:32769",
      injectChanges: true
  });
  watch('./src/sass/**/*.scss', function(event) {
    gulp.start('sass');
  });
  watch(paths.templates, function(event){
    browserSync.reload();
  });
  watch(paths.app_js, function(event){
    gulp.start('bs-run-reload');
    // gulp.start('run-after-vue');
    // browserSync.reload();
  });

});


// static assets version task
gulp.task("static-assets-version", async function(){
  await gulp.src("./config/general.php")
      .pipe(replace(/'staticAssetsVersion' => (\d+)/, function(match, p1, offset, string) {
        p1++;
        return "'staticAssetsVersion' => " + p1;
      }))
      .pipe(gulp.dest("./config"));
});

gulp.task('jsexternals-move-min', function(){
  return gulp.src(paths.jsexternals)
    .pipe(minify({
      ext: {
        min: ".min.js"
      }
    }))
    .pipe(gulp.dest('./web/js'))
});

gulp.task('app-js-build', function(){
  return gulp.src(paths.app_js)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(concat.header('$(document).ready(function() {\n'))
    .pipe(concat.footer('\n});\n'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(minify({
      ext: {
        min: ".min.js"
      }
    }))
    .pipe(gulp.dest('./web/js'))
});

gulp.task('function-js-build', function(){
  return gulp.src(paths.function_js)
    .pipe(sourcemaps.init())
    .pipe(concat('functions.js'))
    // Preserve comments for smartling translation
    .pipe(uglify({
      output: { 
          comments: true
      }
    }))
    .pipe(concat.footer())
    .pipe(sourcemaps.write())
    .pipe(minify({
      ext: {
        min: ".min.js"
      }
    }))
    .pipe(gulp.dest('./web/js'))
});

gulp.task('animation-store', function(cb) {
  pump([
      gulp.src(paths.animations),
      gulp.dest('./web/animations')
    ],
    cb
  );
});

gulp.task('image-webp', async function() {
    return await gulp.src(paths.imgs)
    .pipe(webp({
      quality: 50
    }))
    .pipe(gulp.dest('./web/imgs'))
});

gulp.task('imagemin', async function() {
  return await gulp.src(paths.imgs)
    .pipe(changed('./web/imgs'))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(gulp.dest('./web/imgs'));
});

// Move WEBM videos
gulp.task('video-move-webm', async function () {
  return gulp.src(paths.videoExternals)
    .pipe(gulp.dest('./web/videos'))
});

// CRITICAL CSS
// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
function doSynchronousLoop(data, processData, done) {
  if (data.length > 0) {
      const loop = (data, i, processData, done) => {
          processData(data[i], i, () => {
              if (++i < data.length) {
                  loop(data, i, processData, done);
              } else {
                  done();
              }
          });
      };
      loop(data, 0, processData, done);
  } else {
      done();
  }
}
// Process the critical path CSS one at a time
function processCriticalCSS(element, i, callback) {
  const criticalSrc = pkg.urls.critical + element.url;
  const criticalDest = pkg.paths.templates + element.template + '_critical.min.css';
  const htmlDest = pkg.paths.templates + 'temp/' + element.template + '_critical.html';
  const uncriticalDest = pkg.paths.templates + element.template + + '_uncritical.min.css';


  console.log(pkg.paths.build.css + pkg.vars.siteCssName);

  $.fancyLog("-> Generating critical CSS: " + $.chalk.cyan(criticalSrc) + " -> " + $.chalk.magenta(criticalDest));
  $.critical.generate({
      base: './templates/',
      src: 'index.html',
      inline: true,
      width: 1200,
      height: 1200,
      minify: true,
      extract: false,
      dimensions: [{
        width: 320,
        height: 480
      },{
        width: 768,
        height: 1024
      },{
        width: 1280,
        height: 960
      }],
      // Your CSS Files (optional)
      css: ['../web/css/styles.min.css'],
      target:{
        css: criticalDest,
        html: htmlDest,
        uncritical: uncriticalDest,
      }
  }, (err, output) => {
      console.log(output);
      if (err) {
          console.log('hubo un error')
          $.fancyLog(err);
      }
      callback();
  });
}
//critical css task
gulp.task('criticalcss', gulp.series('sass', (callback) => {
  console.log("hola", pkg.globs.critical);
  var critical = pkg.globs.critical;
  doSynchronousLoop(critical, processCriticalCSS, () => {
      callback();
  },critical, fancyLog, chalk);
}));

gulp.task('svgstore', function() {
  return gulp.src(paths.svgs)
    .pipe(svgstore())
    .pipe(gulp.dest('./web/svgs'));
});

gulp.task('vendor-build', function() {
  return gulp.src(paths.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./web/js'));
});

gulp.task('move-vue', function(cb) {
  pump([
      gulp.src(paths.vue_js),
      gulp.dest('./web/js/vue-full')
    ],
    cb
  );
});

gulp.task('build-vue', shell.task('npm run build'));

gulp.task('build-vue-dev', shell.task('npm run dev'));

gulp.task('bs-run-reload', gulp.series('app-js-build', function(){
  browserSync.reload();
}));

gulp.task('run-after-vue', gulp.series(['build-vue-dev', 'bs-run-reload']));

gulp.task('watch', function() {
  watch('./src/sass/**/*.scss', gulp.series(['sass']));
  watch(paths.app_js, gulp.series(['app-js-build']));
  watch(paths.function_js, gulp.series(['function-js-build']));
  watch(paths.imgs, gulp.series(['imagemin']));
  watch(paths.imgs, gulp.series(['image-webp']));
  watch(paths.svgs, gulp.series(['svgstore']));
  watch(paths.vendor, gulp.series(['vendor-build']));
  watch(paths.animations, gulp.series(['animation-store']));
  watch(paths.vue_js, gulp.series(['build-vue']));
  watch(paths.jsexternals, gulp.series(['jsexternals-move-min']));
  watch(paths.videoExternals, gulp.series(['video-move-webm']));
});

gulp.task('watch-dev', function() {
  watch('./src/sass/**/*.scss', gulp.series(['sass']));
  watch(paths.app_js, gulp.series(['app-js-build']));
  watch(paths.function_js, gulp.series(['function-js-build']));
  watch(paths.imgs, gulp.series(['image-webp']));
  watch(paths.imgs, gulp.series(['imagemin']));
  watch(paths.svgs, gulp.series(['svgstore']));
  watch(paths.vendor, gulp.series(['vendor-build']));
  watch(paths.animations, gulp.series(['animation-store']));
  watch(paths.vue_js, gulp.series(['build-vue-dev']));
  watch(paths.jsexternals, gulp.series(['jsexternals-move-min']));
  watch(paths.videoExternals, gulp.series(['video-move-webm']));
});

gulp.task('sass-build', function() {
  var processors = [
    autoprefixer
  ];
  return gulp.src(paths.sass)
    .pipe(sass({
      includePaths: ['node_modules/bootstrap/scss/']
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./web/css'))
});


gulp.task('build', gulp.series(['imagemin', 'image-webp', 'svgstore', 'sass', 'sass-build', 'static-assets-version', 'jsexternals-move-min' ,'app-js-build', 'function-js-build', 'vendor-build', 'animation-store', 'build-vue', 'video-move-webm']));
