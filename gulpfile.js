const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const minimist = require('minimist');
//設置開發狀態
let envOptions = {
    string: 'env',
    default: {
        env: 'develop'
    }
};
let options = minimist(process.argv.slice(2), envOptions)
//目前開發狀態
console.log(options);

//remove public
gulp.task('clean', function () {
    return gulp.src('./public', { read: false })
        .pipe($.clean());
});

//copyHTML
gulp.task('copyHTML', function () {
    return gulp.src('./source/*.html')
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream())
})

//copyCSS
gulp.task('copyCSS', function () {
    let plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
    ];
    return gulp.src(['./node_modules/bootstrap/dist/css/**/bootstrap.min.css', './source/css/*'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        //壓縮CSS
        .pipe($.postcss(plugins))
        .pipe($.concat('all.css'))
        //壓縮CSS
        .pipe($.if(options.env === 'prod', $.cleanCss()))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
})

//pug
gulp.task('pug', function buildHTML() {
    return gulp.src('./source/*.pug')
        .pipe($.plumber())
        .pipe($.pug({
            //若為false將會去除空格
            pretty: false
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream())
});

//JS編譯
gulp.task('babel', () =>
    gulp.src(['./source/js/**/jquery-3.3.1.min.js', './source/js/**/*.js'])
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('all.js'))
        .pipe($.if(options.env === 'prod', $.uglify({
            //壓縮
            compress: {
                //刪除console
                drop_console: true
            },
        })))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
);
//壓縮image
gulp.task('image-min', () =>
    gulp.src(['./source/img/*','./source/images/*/**'])
        .pipe($.if(options.env === 'prod', $.image()))
        .pipe(gulp.dest('./public/images'))
);

//Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});
gulp.task('deploy', function () {
    return gulp.src('./public/**/*')
        .pipe($.ghPages());
});

//watch
gulp.task('watch', gulp.parallel('browser-sync', function () {
    gulp.watch('./source/**/*.pug', gulp.series('pug'));
    gulp.watch('./source/css/*.css', gulp.series('copyCSS'));
    gulp.watch('./source/js/*.js', gulp.series('babel'));
}))

gulp.task('bulid', gulp.series($.sequence('clean', 'pug', 'copyCSS', 'babel', 'image-min')))
//4.0要加入gulp.series
//default gulp
gulp.task('default', gulp.series('pug', 'copyCSS', 'babel', 'image-min', 'watch'))