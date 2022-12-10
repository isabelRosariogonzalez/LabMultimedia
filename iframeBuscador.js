$(document).ready(function(){
    // seleccionamos el  video
    let video = $("#videoPlayer");
    // seleccionamos el anchor
    let anchor = $("a");
    // seleccionamos el iframe
    let frame = $("#youtube");
    // embed youtube url
    let embed = "https://www.youtube.com/embed/";

    $(document).on("change", ".file_multi_video", function(evt) {
        let $source = $('#videos');
        $source[0].src = URL.createObjectURL(this.files[0]);
        $source.parent()[0].load();
    });

    // asignamos un evento click a los anchor
    anchor.on("click", function(e){
        // prevenimos el comportamiento por defecto del anchor
        e.preventDefault();
        // optenemos el valor el href del anchor
        let href = $(this).attr("href");
        // creamos un regex para youtube
        let you =/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        // validamos que sea un video de youtube
        if (href.match(you)) {
            //obtenemos el id del video
            let idv = href.match(you)[1];
            // escondemos el reproductor de video html5
            video.css("display","none");
            // pausamos el video html5
            video[0].pause();
            // configuramos el iframe con el video de youtub
            frame.attr("src",`${embed}${idv}?autoplay=1`);
            // mostramos el iframe
            frame.css("display","initial");

        }else{
            // escondemos el iframe
            frame.css("display","none");
            // mostramos el reprodutor de video html5
            video.css("display","initial");
            // desconfiguramos el iframe para que el video se pause
            frame.attr("src",`${embed}`);
            // asignamos como src del video el valor el href del anchor
            video[0].src = href;
            //cargamos el video
            video[0].load();
            //le damos play
            video[0].play();
        }
    })
});