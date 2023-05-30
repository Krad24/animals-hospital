"use strict"

const { src, dest, watch, parallel, series, on } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const pictureHtml = require('gulp-webp-avif-html-nosvg-nogif-lazyload');
const newer = require('gulp-newer')
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');
const avif = require('gulp-avif');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const fileInclude = require('gulp-file-include');

const htmlInclude = () => {
    return src(['app/html/*.html'])
    .pipe(fileInclude ({
        prefix: '@',
        basepath: '@file',
    }))
    .pipe(pictureHtml({
        primaryFormat: 'avif',
        secondaryFormat: 'webp',
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

const svgSprites = () => {
    return src (['app/images/icon/icon-svg/*.svg'])
    .pipe(cheerio({
        run: function($) {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('[style]').removeAttr('style');
        }, 
        parserOptions : {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite : "../sprite.svg"
            }
        },
    }))
    .pipe(dest('app/images'))
}


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({
            outputStyle: 'compressed'
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
            //'node_modules/jquery/dist/jquery.js',
            // 'node_modules/slick-carousel/slick/slick.js',
            // 'node_modules/mixitup/dist/mixitup.js',
            // 'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
            // 'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
            // 'node_modules/rateyo/src/jquery.rateyo.js',
            // 'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
            'node_modules/swiper/swiper-bundle.min.js',
            // 'node_modules/simplebar/dist/simplebar.js',
            'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}



function images() {
    return src(['app/images/**/*.png', 'app/images/**/*.jpg'])
      .pipe(newer('app/images'))
      .pipe(avif({ quality: 50 }))
  
      .pipe(src('app/images/**/*.*'))
      .pipe(newer('app/images'))
      .pipe(webp())
  
      .pipe(src(['app/images/**/*.*', '!app/images/sprite.svg', '!app/images/icon/icon-svg/*.svg']))
      .pipe(newer('app/images'))
      .pipe(imagemin())
  
      .pipe(dest('app/images'))
} 

function conWebp() {
    return src('app/images/**/*.jpg')
    .pipe(newer('app/images/**/*.*'))
    .pipe(webp())
    .pipe(dest('app/images'))
}

function fonts() {
    src('app/fonts/*.ttf')
        .pipe(ttf2woff())
        .pipe(dest('app/fonts'));
    return src('app/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

function otfTottf() {
    return src('app/fonts/*.otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest('app/fonts'));
}

function cleanFonts(){
    return src('app/fonts/*.+(ttf|otf)')
        .pipe(clean())
}

function build(){
    return src([
        'app/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/fonts/*.*',
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function cleanDist() {
    return src('dist')
      .pipe(clean())
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload);
    watch(['app/images/src'], images)
    watch(['app/images/icon/icon-svg/*.svg'], svgSprites);
    watch(['app/images/icon/icon-svg/*.svg']).on('change', browserSync.reload);
    watch(['app/html/**/*.html'], htmlInclude);
    watch(['app/scss/**/*.scss']).on('change', browserSync.reload);
}


exports.fonts = fonts;
exports.otfTottf = otfTottf;
exports.htmlInclude = htmlInclude;
exports.svgSprites = svgSprites;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.cleanFonts = cleanFonts;
exports.convertFonts = series(otfTottf, fonts, cleanFonts);
exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, images, svgSprites, htmlInclude, browsersync, watching);