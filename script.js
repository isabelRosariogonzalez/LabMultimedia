/******************************************************
 * PLAYLIST PARA REPRODUCIR VIDEOS
 *****************************************************/
const main_video = document.querySelector('.main-video video');
const main_video_title = document.querySelector('.main-video .title');
const video_playlist = document.querySelector('.video-playlist .videos');


// INTRODUCIMOS LOS VIDEOS MANUALMENTE
let data = [
    {
        'id': 'a1',
        'title': 'Body parts',
        'name': 'bodyParts.mp4',
        'duration': '1:30'
    },
    {
        'id': 'a2',
        'title': 'Colors',
        'name': 'Colors.mp4',
        'duration': '2:01',
    },
    {
        'id': 'a3',
        'title': 'Numbers',
        'name': 'numbers.mp4',
        'duration': '24:49',
    },

    {
        'id': 'a4',
        'title': 'Food',
        'name': 'Food.mp4',
        'duration': '1:58',
    },
    {
        'id': 'a5',
        'title': 'Get Dressed',
        'name': 'GetDressed.mp4',
        'duration': '1:54',
    },
    {
        'id': 'a6',
        'title': 'Go To Bed',
        'name': 'GoToBed.mp4',
        'duration': '1:58',
    },
    

];

// LEE CADA VIDEO Y LO INTRODUCE A LA PLAYLIST
data.forEach((video, i) => {
    let video_element = `
                <div class="video" data-id="${video.id}">
                    <img src="images/play.svg" alt="">
                    <p>${i + 1 > 4 ? i + 1 : '0' + (i + 1)}. </p>
                    <h3 class="title">${video.title}</h3>
                    <p class="time">${video.duration}</p>
                </div>
    `;
    video_playlist.innerHTML += video_element;
})

let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = 'images/pause.svg';

videos.forEach(selected_video => {
    selected_video.onclick = () => {

        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = 'images/play.svg';

        }

        selected_video.classList.add('active');
        selected_video.querySelector('img').src = 'images/pause.svg';

        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = 'videos/' + match_video.name;
        main_video_title.innerHTML = match_video.title;
    }
});