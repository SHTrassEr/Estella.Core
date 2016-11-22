/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var insert = require('gulp-insert');

var nodeJsModuleDeclaration = '\ndeclare module \'estella-core\' { export default Estella; }';
var useStrict = '\'use strict\';\n';


var srcCorePath = 'src/Core/**/*.ts';
var srcServerPath = 'src/Server/**/*.ts';
var srcClientPath = 'src/Client/**/*.ts';
var srcTestPath = 'src/Test/**/*.ts';
var libPath = 'lib/**/*.d.ts';

var outLibPath = 'out/estella-core/lib';
var outTestsPath = 'out/estella-core/test';
var outTypingsPath = 'out/estella-core/typings';


gulp.task('build-server', function () {
    var tsResult = gulp.src([libPath, srcCorePath, srcServerPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-core-server.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest(outLibPath)),
        tsResult.dts.pipe(insert.append(nodeJsModuleDeclaration)).pipe(gulp.dest(outTypingsPath))
    ]);
});


gulp.task('build-client', function () {
    var tsResult = gulp.src([libPath, srcCorePath, srcClientPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-core-client.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest(outLibPath)),
        tsResult.dts.pipe(gulp.dest(outTypingsPath))
    ]);
});

gulp.task('build-full', function () {
    var tsResult = gulp.src([libPath, srcCorePath, srcServerPath, srcClientPath])
        .pipe(ts({
            declaration: true,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-core-full.js'
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest(outTypingsPath))
    ]);
});


gulp.task('build-test', function () {
    var tsResult = gulp.src([libPath, srcCorePath, srcTestPath])
        .pipe(ts({
            declaration: false,
            removeComments: true,
            target: 'es6',
            outFile: 'estella-core-test.js'
        }));

    return merge([
        tsResult.js.pipe(insert.prepend(useStrict)).pipe(gulp.dest(outTestsPath))
    ]);
});


gulp.task('copy-npm', ['build-server', 'build-client', 'build-full', 'build-test'], function () {
    return merge([
        gulp.src('out/estella-core/**/*').pipe(gulp.dest('npm'))
    ]);
});



gulp.task('build-all', ['build-server', 'build-client', 'build-full', 'build-test']);

