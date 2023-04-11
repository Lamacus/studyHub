const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "home.mp3", "spark.mp3", "summer.mp3"];
const musics = [
  {
    id: 1,
    title: "Lịch sử Đảng",
    file: "holo.mp3",
    image:
      "https://ischoolconnect.com/blog/wp-content/uploads/2021/12/study-novels-1-min.jpg",
  },
  {
    id: 2,
    title: "Kinh tế học - P1",
    file: "home.mp3",
    image:
      "https://i.ytimg.com/vi/DkxZ-b5Cdmw/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD5o43ssFqza9KRHMTsuZZz1rzX9A",
  },
  {
    id: 3,
    title: "Kinh tế học - P2",
    file: "spark.mp3",
    image:
      "https://i.ytimg.com/vi/DkxZ-b5Cdmw/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD5o43ssFqza9KRHMTsuZZz1rzX9A",
  },
  {
    id: 4,
    title: "Kinh tế học - P3",
    file: "summer.mp3",
    image:
      "https://i.ytimg.com/vi/DkxZ-b5Cdmw/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLD5o43ssFqza9KRHMTsuZZz1rzX9A",
  },
];

let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    isPlaying = true;
    playPause();
  } else {
    //
  }
  changeSong(1);
}
function changeSong(dir) {
  if (dir === 1) {
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  //   song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    isPlaying = true;
    clearInterval(timer);
  }
}

function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}

function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}

function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);

// Modal

var btnOpen = document.querySelector(".open-modal-btn");
var modal = document.querySelector(".modal");
var iconClose = document.querySelector(".modal__header i");
var btnClose = document.querySelector(".modal__footer button");

function toggleModal() {
  modal.classList.toggle("hide");
}

btnOpen.addEventListener("click", toggleModal);
btnClose.addEventListener("click", toggleModal);
iconClose.addEventListener("click", toggleModal);
modal.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    toggleModal();
  }
});

// Toast

function toast({title = '', message = '', type = 'info', duration = 3000}) {
  const main = document.getElementById('toast')
  const icons = {
    success: 'fas fa-circle-check',
    error: 'fa-solid fa-xmark',
  }
  const icon = icons[type]
  const delay = (duration / 1000).toFixed(2)
  if (main) {
    const autoRemoveId = setTimeout(function() {
      main.removeChild(toast);
    }, duration + 1000)
    const toast = document.createElement('div')
    toast.onclick = function(e) {
      if (e.target.closest('.toast__close')) {
        main.removeChild(toast)
        clearTimeout(autoRemoveId)
      }
    }
    toast.classList.add('toast', `toast--${type}`)
    toast.style.animation =`slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`
    toast.innerHTML = `
    <div class="toast__icon">
        <i class="${icon}"></i>
      </div>
      <div class="toast__body">
        <h3 class="toast__title">${title}</h3>
        <p class="toast__msg">${message}</p>
      </div>
      <div class="toast__close">
        <i class="fa-solid fa-xmark"></i>
      </div>
    `
    main.appendChild(toast)
  }
}


function showSuccessToast() {
  toast({
    title: 'Thông báo',
    message: 'Chức năng này đang cập nhật',
    type: 'error',
    duration: 3000
  })
}
function showErrorToast() {
  toast({
    title: 'Thông báo',
    message: 'Chức năng này đang cập nhật',
    type: 'error',
    duration: 3000
  })
}