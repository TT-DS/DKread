const gulp = require("gulp"),
	  miniCss = require("gulp-minify-css"),
	  uglify = require("gulp-uglify"),
	  babel = require("gulp-babel"),
	  connect = require("gulp-connect"),
	  sass = require("gulp-sass");

//制定任务

gulp.task("html", function(){
	gulp.src("app/index.html").pipe(gulp.dest("dist")).pipe(connect.reload());
	gulp.src("app/html/**/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})

//gulp.task("css", function(){
//	gulp.src("app/scss/**/*.scss")
//		.pipe(sass())
//		.pipe(miniCss())
//		.pipe(gulp.dest("dist/css"))
//		.pipe(connect.reload());
//})

gulp.task("css", function(){
	gulp.src(["app/scss/**/*.scss","!app/scss/component/**/*.scss"])
		.pipe(sass())
		.pipe(miniCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})


gulp.task("css", function(){
	gulp.src("app/scss/**/*.scss")
		.pipe(sass())
		.pipe(miniCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})

gulp.task("js", function(){
	gulp.src("app/js/**/*.js")
		.pipe(babel({
	        presets: ['@babel/env']
	    }))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})

gulp.task("module", function(){
	gulp.src("app/module/**/*.js")
		.pipe(babel({
	        presets: ['@babel/env']
	    }))
		.pipe(uglify())
		.pipe(gulp.dest("dist/module"))
		.pipe(connect.reload());
})

gulp.task("libs", function(){
	gulp.src("app/libs/**/*")
	.pipe(gulp.dest("dist/libs"))
	.pipe(connect.reload());
})

gulp.task("img", function(){
	gulp.src("app/images/**/*")
		.pipe(gulp.dest("dist/images"))
		.pipe(connect.reload());
})

gulp.task("server", function(){
	connect.server({
		livereload: true,
		port:2333,
		root:"dist"
	})
})

gulp.task("watch", function(){
	gulp.watch("app/index.html",["html"]);
	gulp.watch("app/html/**/*.html",["html"]);
	gulp.watch("app/scss/**/*.scss", ["css"]);
	gulp.watch("app/js/**/*.js", ["js"]);
	gulp.watch("app/module/**/*.js", ["module"]);
	gulp.watch("app/images/**/*", ["img"]);
})

gulp.task("default", ["html", "css", "js", "module", "img", "libs", "server", "watch"]);







