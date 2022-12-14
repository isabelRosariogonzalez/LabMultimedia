/******************************************************
 *  FUNCION: Youtube URL Parser
 *  Extrae y devuelve el ID, la hora de inicio y los 
 *  parámetros de video relacionados con el URL de YouTube.
 *****************************************************/
function youtubeUrlParser(url) {

    var timeToSec = function (str) {
        var sec = 0;
        if (/h/.test(str)) { sec += parseInt(str.match(/(\d+)h/, '$1')[0], 10) * 60 * 60; }
        if (/m/.test(str)) { sec += parseInt(str.match(/(\d+)m/, '$1')[0], 10) * 60; }
        if (/s/.test(str)) { sec += parseInt(str.match(/(\d+)s/, '$1')[0], 10); }
        return sec;
    };

    var videoId = /^https?\:\/\/(www\.)?youtu\.be/.test(url) ? url.replace(/^https?\:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/, "$2") : url.replace(/.*\?v\=([\w-]{11}).*/, "$1");
    var videoStartTime = /[^a-z]t\=/.test(url) ? url.replace(/^.+t\=([\dhms]+).*$/, '$1') : 0;
    var videoStartSeconds = videoStartTime ? timeToSec(videoStartTime) : 0;
    var videoShowRelated = ~~/rel\=1/.test(url);

    return {
        id: videoId,
        startString: videoStartTime,
        startSeconds: videoStartSeconds,
        showRelated: videoShowRelated
    };

}; 


var input = document.querySelector('input[type="text"]');
input.focus();
var button = document.querySelector('input[type="button"]');
var output = document.querySelector('output');
var figure = document.querySelector('figure');

var outputResult = function () {
    var video = youtubeUrlParser(input.value);
    figure.innerHTML = '<iframe src="https://www.youtube.com/embed/' + video.id + '?' + (video.startSeconds ? 'start=' + video.startSeconds + '&amp;' : '') + 'enablejsapi=1&amp;autohide=1&amp;color=white&amp;controls=1&amp;playsinline=1&amp;rel=' + video.showRelated + '&amp;autoplay=true&amp;showinfo=0&amp;theme=light&amp;wmode=transparent" width="1920" height="1080" allowfullscreen></iframe>';

};

button.addEventListener('click', outputResult);
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) { outputResult(); }
});