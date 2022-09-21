const {src, dest, watch, series, parallel} = require('gulp');

//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss= require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Imagenes
const webp= require('gulp-webp');
const avif = require('gulp-avif');


function css(done){
    //compilar sass
    // pasos: 1- Identificar archivo, 2- Compilar, 3- Guardar el CSS
    src('src/scss/app.scss')
        .pipe(sass() )
        .pipe(postcss([autoprefixer() ]))
        .pipe(dest('build/css'))
    done();
}


function imagenes(){
    return src('src/img/**/*')
        .pipe(dest('build/img') )

}

function versionWebp(){
    const opciones = {
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe(dest('build/img'))
}

function versionAvif(){
    const opciones = {
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
}


function dev(){
    watch('src/scss/**/*.scss',css);
    watch('src/img/**/*', imagenes);
   
}



exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif,  css, dev);

//series- se inicia una tarea, y hasta que finaliza, incia la siguiente.
//parallel- Todas inician al mismo tiempo y van completandose
// la tarea que contenga el watch siempre es mejor dejarla hasta el final