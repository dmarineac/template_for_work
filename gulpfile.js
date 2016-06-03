'use strict';
var gulp = require('gulp'),
    //server
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    //html
    jade = require('gulp-jade'),
    htmlmin = require('gulp-htmlmin'),
    htmlhint = require("gulp-htmlhint"),
    googlecdn = require('gulp-google-cdn'),
    wiredep = require('wiredep').stream,

    //css
    stylus = require('gulp-stylus'),
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    //js
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    //files
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    mainBowerFiles = require('gulp-main-bower-files'),
    bump = require('gulp-bump');


//update packages of gulp//
gulp.task('bump', function(){
    gulp.src('package.json')
        .pipe(bump())
        .pipe(gulp.dest('./test'));
});

// Server //
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {baseDir: "./public"} //запуск встроенного локального сервера
        //proxy: "localhost/pddpmr3/public/"    //запуск стороннего локального сервера/или ссылки сайта
    });
});

//Jade //
gulp.task('jade', function(){
    gulp.src('app/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
        .pipe(htmlmin({collapseWhitespace: true}))
        //.pipe(browserSync.stream())
        .pipe(gulp.dest('public/'));
        //.pipe(browserSync.stream());
});

// Stylus  //
gulp.task('stylus', function () {
    gulp.src('app/styles/main.styl')
        .pipe(stylus({
            'include css': true
        }))
        //FIXME попробовать будет ли работать autoprefixer(не используется prefixer для файла normalize?)
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('public/css/'));
});

//автоматическое подлючение js и css библиотек
//FIXME пути к бибилиотекам отличаются от переопределеных в bower.json
gulp.task('wiredep',function(){
    gulp.src('app/includes/layout.jade')
        .pipe(wiredep({
            directory:'app/bower_components'
        }))
        .pipe(gulp.dest('app/includes/'))
});

//TODO настроить JS таск
gulp.task('js', function(){
    //gulp.src(['app/js/bootstrap/dist/js/bootstrap.min.js','app/js/main.js'])
    gulp.src('app/js/main.js')
        //.pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});
// FILES //
// Images //
gulp.task('imageMin', function(){
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
});
// Fonts //
gulp.task('copyFonts', function() {
    gulp.src('app/fonts/*')
        .pipe(gulp.dest('public/fonts'))
});
//Вытаскиваем файлы CSS библиотек из bower_components в разные папки //
//FIXME Вытаскивает папки с бибилотеками, а надо только файлы
gulp.task('mainCSS', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('app/styles'))
});
//Вытаскиваем файлы CSS библиотек из bower_components в разные папки //
//FIXME Вытаскивает папки с бибилотеками, а надо только файлы
gulp.task('mainJS', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('app/js'))
});

// END-FILES //

// WATCH //
gulp.task('watch', function(){
        gulp.watch('app/styles/*.styl',['stylus'])
        gulp.watch(['app/*.jade','app/includes/*.jade'],['jade'])
        gulp.watch('app/js/*.js',['js'])
        gulp.watch('app/bower_components/**',['wiredep'])
        gulp.watch('app/img/**',['imageMin'])
        gulp.watch('app/fonts/**',['copyFonts'])
        gulp.watch("public/**").on('change', browserSync.reload);
});

// TESTING //
gulp.task('testTask', function() {
    gulp.src('public/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});


// BUILD TASK //
// FIXME посмотреть работает ли плагин?
gulp.task('uncss', function(){
    gulp.src('public/css/*.min.css')
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('public/css'))
});
//FIXME!!! не работает плагин
gulp.task('google-cdn', function () {
    gulp.src('public/*.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('public/'))
});
// END BUILD TASK //


// DEFAULT TASK //
gulp.task('default', ['browser-sync','watch']);

//FIXME настроить

// TESTING //
gulp.task('test', ['browser-sync','watch']);

//FIXME настроить
// BUILD //
gulp.task('build', ['browser-sync','uncss','google-cdn'/*,'watch'*/]);
