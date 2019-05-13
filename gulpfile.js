const gulp = require("gulp"),
    sass = require("gulp-sass"),
    cleanCss = require("gulp-clean-css");

const style = () => {
    return gulp
        .src("./src/style/main.scss")
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest("build/static/css/"));
};

const watch = () => {
    gulp.watch(`./src/**/*.scss`, style);
};

exports.style = style;
exports.watch = watch;
exports.default = style;
