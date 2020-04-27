const gulp = require("gulp");
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const sass = require('gulp-sass');

//перенос файла index.html из vue в папку admin
gulp.task("copy-html", () =>{    
    return gulp.src("src/index.html")   
            .pipe(gulp.dest("../admin"));    
});

//перенос файлов и папок из vue/api в папку admin/vue
gulp.task("copy-api", () =>{    
    return gulp.src("api/**/*.*")   
            .pipe(gulp.dest("../admin/api"));    
});

//перенос файлов и папок из vue/assets в папку admin/assets
gulp.task("copy-assets", () =>{    
    return gulp.src("assets/**/*.*")   
            .pipe(gulp.dest("../admin/assets"));    
});

//конструктор для файла main.js
gulp.task("build-js", () =>{
    return browserify('src/main.js', {debug: true})
            .transform("babelify", {presets: ["@babel/preset-env"], sourceMaps: true})
            .bundle() 
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('../admin')); 
});

//для работы со стилями
gulp.task("build-sass", () =>{
    return gulp.src('scss/style.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('../admin'));
});


//чтобы команды gulp запускались автоматически при изменении файлов в папке vue
gulp.task("watch", () =>{
    gulp.watch("src/index.html", gulp.parallel("copy-html"));
    gulp.watch("api/**/*.*", gulp.parallel("copy-api"));
    gulp.watch("assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("src/**/*.js", gulp.parallel("build-js"));
    gulp.watch("scss/**/*.scss", gulp.parallel("build-sass"));
});


//чтобы работало без gulp watch
gulp.task("build", gulp.parallel("copy-html", "copy-api", "copy-assets", "build-js", "build-sass"))

//запуск команд watch и build командой gulp
gulp.task("default",gulp.parallel("watch","build"))