const player = document.getElementById('player');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const poster = document.getElementById('poster');
const title = document.getElementById('title');

const songs = [
    {
        "title": "Better Days",
        "fileName": "betterdays",
        "songFormat": "mp3",
        "posterFormat": "jpg"
    },
    {
        "title": "Dubstep",
        "fileName": "dubstep",
        "songFormat": "mp3",
        "posterFormat": "jpg"
    },
    {
        "title": "Energy",
        "fileName": "energy",
        "songFormat": "mp3",
        "posterFormat": "jpg"
    },
    {
        "title": "Epic",
        "fileName": "epic",
        "songFormat": "mp3",
        "posterFormat": "jpg"
    }
]

let songIndex = 0;

// 
play.addEventListener('click', tooglePlay)
next.addEventListener('click', nextTrack)
prev.addEventListener('click', prevTrack)
audio.addEventListener('timeupdate', timeUpdate)
audio.addEventListener('ended', nextTrack)
progressBar.addEventListener('click', rewindSong)
//Functions

function tooglePlay() {
    const isPlayed = player.classList.contains('played');
    const playIcon = play.querySelector('i');
    if (isPlayed) {
        audio.pause();
        playIcon.classList.remove('fa-pause')
        playIcon.classList.add('fa-play')
        player.classList.remove('played');
    } else {
        audio.play();
        playIcon.classList.add('fa-pause')
        playIcon.classList.remove('fa-play')
        player.classList.add('played');
    }
}

function nextTrack () {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    updatePlayer();
}

function prevTrack () {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    updatePlayer();
}

function updatePlayer() {
    const currentSong = songs[songIndex];
    title.innerText = currentSong.title;
    audio.src = `./data/${currentSong.fileName}.${currentSong.songFormat}`;
    poster.src = `./data/${currentSong.fileName}.${currentSong.posterFormat}`;
    audio.play();
}

function rewindSong(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function timeUpdate (e) {
    const {duration, currentTime} = e.target;
    const value = Math.round(currentTime / duration * 100);
    progress.style.width = `${value}%`
}