// This configuration is OPTIONAL

// in order to use this file
// both gulp and gulp-sass and node-sass must be install globally
// "npm install -g node-sass gulp gulp-cli"
// type "gulp default" into the terminal
// CTRL + C / CMD + C to cancel

//please note that this configuration has to be restarted periodically due to bugs
//it doesn't always stop because your code is wrong. (It will simply crash due to race conditions with file locks.)
//simply restart if it does crash

// Sass configuration
var gulp = require('gulp');
var rsync = require('gulp-rsync');
var wait = require('gulp-wait');

var rsyncFunction = function() { 
    return new Promise(function(resolve, reject) {
        console.log("got here");
        gulp.src('.')
            .pipe(wait(500))
            .pipe(rsync({
                root: '.',
                destination: '~/docker',
                username: 'magento',
                port: 6022,
                hostname: 'localhost',
                progress: true,
                incremental: true,
                recursive: true,
                clean: true,
                exclude: ['.git/', 'node_modules/', 'database/']
            }))
            .on('error', function(e){
                console.log(e);
                console.log("Caught Error");
                resolve();
            })
            .pipe(resolve());
    });
};

gulp.task('rsync', rsyncFunction);

gulp.task('default', gulp.series(rsyncFunction, function(done) {
    gulp.watch(['.'])
        .on('change', gulp.series(function(event, path){
            console.log("change");
            rsyncFunction().then(function(){
                console.log("done");
            });
        }))
        .on('unlink', gulp.series(function(event, path){
            console.log("unlink");
            rsyncFunction().then(function(){
                console.log("done");
            });
        }))
        .on('add', gulp.series(function(event, path){
            console.log("add");
            rsyncFunction().then(function(){
                console.log("done");
            });
        }));
}));