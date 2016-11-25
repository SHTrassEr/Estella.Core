/// <binding />
let gulp = require('gulp');
let ts = require('gulp-typescript');
let merge = require('merge2');


gulp.task("build-client", function () {
    let tsProjectClient = ts.createProject("src/Client/tsconfig.json");
    let tsResult = tsProjectClient.src()
        .pipe(tsProjectClient())

    return merge([
        tsResult.js.pipe(gulp.dest('./')),
        tsResult.dts.pipe(gulp.dest('./'))
    ]);
});

gulp.task("build-server", function () {
    let tsProjectServer = ts.createProject("src/Server/tsconfig.json");
    let tsResult = tsProjectServer.src()
        .pipe(tsProjectServer())

    return merge([
        tsResult.js.pipe(gulp.dest('./')),
        tsResult.dts.pipe(gulp.dest('./'))
    ]);
});


gulp.task('build-npm', ['build-server', 'build-client'], function () {
    return merge([
        gulp.src('out/estella-core/*.js').pipe(gulp.dest('npm/lib')),
        gulp.src('out/estella-core/*.d.ts').pipe(gulp.dest('npm/typings'))
    ]);
});
