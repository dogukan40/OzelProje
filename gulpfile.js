/* Gulp modülünü yüklüyoruz */
var gulp = require("gulp");
/* Watch modunda çalışırken hata oluştuğunda Gulp'ın otomatik olarak kapanmasını engelleme modülünü yüklüyoruz */
var plumber = require("gulp-plumber");
/* CSS ve JS dosyaları için source map oluşturma modülünü yüklüyoruz */
var sourcemaps = require("gulp-sourcemaps");
/* SCSS dosyalarını compile etme modülünü yüklüyoruz */
var sass = require("gulp-sass");
/* Sunucu oluşturma ve dosya değişimlerinde tarayıcıya yenileme komutu gönderme modülünü yüklüyoruz */
var prefix = require("gulp-autoprefixer");

/* Sunucu oluşturma ve dosya değişimlerinde tarayıcıya yenileme komutu gönderme modülünü yüklüyoruz */
var rename = require("gulp-rename");
var iconfont = require("gulp-iconfont");
var iconfontCss = require("gulp-iconfont-css");

var yol = {
  scss: { kaynak: "./assets/scss/main.scss", hedef: "./assets/css/" },
  svg: { kaynak: "./assets/img/icons/" }
};

var dinlenecek = "./assets/scss/**/**.scss";

var svgSprite = require("gulp-svg-sprite"),
  // Basic configuration example
  config = {
    mode: {
      symbol: {
        // symbol mode to build the SVG
        render: {
          css: false, // CSS output option for icon sizing
          scss: false // SCSS output option for icon sizing
        },
        dest: "img", // destination folder
        // prefix: '.icon-', // BEM-style prefix if styles rendered
        sprite: "icons.svg", //generated sprite name
        example: true // Build a sample page, please!
      }
    }
  };

gulp.task("iconfont", function() {
  gulp
    .src("**/*.svg", { cwd: "assets/img/icons" })
    .pipe(plumber())
    .pipe(svgSprite(config))
    .on("error", function(error) {
      /* Do some awesome error handling ... */
    })
    .pipe(gulp.dest("assets"));
});

// const fontName = 'icons';
//
// gulp.task('iconfont', function() {
//     gulp
//         .src(['assets/icons/*.svg'])
//         .pipe(
//             iconfontCss({
//                 fontName: fontName,
//                 targetPath: 'style.css',
//                 fontPath: './',
//                 cssClass: 'icon',
//             })
//         )
//         .pipe(
//             iconfont({
//                 fontName: fontName,
//                 formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
//                 normalize: true,
//                 prependUnicode: true, // recommended option
//                 fontHeight: 1001, // Tried lot of values, <1000 and also 10000, and 100000 :P but no success
//                 centerHorizontally: true,
//             })
//         )
//         .pipe(gulp.dest('assets/fonts/icons'));
// });

/* SCSS dosyalarını compile ve minify edip, source map'lerini oluşturma görevini tanımlıyoruz */
gulp.task("scss", function() {
  /* SCSS dosyalarının yolunu gösteriyoruz */
  gulp
    .src(yol.scss.kaynak)
    /* Hata oluştuğunda Gulp'ın otomatik olarak kendisini kapatmasını engelliyoruz */
    .pipe(plumber())
    /* Source map oluşturma zincirini başlatıyoruz */
    .pipe(sourcemaps.init())
    /* Tarayıcı uyumlulukları için auto prefixer */
    //.pipe(prefix())
    /* SCSS dosyalarını compile ve minify edip, CSS dosyaları üretiyoruz */
    .pipe(sass({ outputStyle: "compressed" }))
    // /* CSS dosyalarının uzantılarını değiştiriyoruz */
    .pipe(rename({ extname: ".css" }))
    /* Source map dosyalarını kaydediyoruz */
    .pipe(sourcemaps.write("."))
    /* CSS dosyalarını kaydediyoruz */
    .pipe(gulp.dest(yol.scss.hedef));
});

gulp.task("watch", function() {
  /* SCSS dosyalarını dinleyip, değişimleri sonrasında `scss` görevini çalıştırıyoruz */
  gulp.watch(dinlenecek, ["scss"]);
});

gulp.task("default", ["scss", "watch", "iconfont"]);
