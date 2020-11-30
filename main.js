$(document).ready(function () {
    $('.col-md-6').children('.slider').slick({
        arrows: false,
        dots: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 5000,
        draggable: true,
        swipe: true
    })

    $('.slide-dot1').on('click', function () {
        $('.col-md-6').children('.slider').slick('slickGoTo', 4)
    })
    $('.slide-dot2').on('click', function () {
        $('.col-md-6').children('.slider').slick('slickGoTo', 1)
    })
    $('.slide-dot3').on('click', function () {
        $('.col-md-6').children('.slider').slick('slickGoTo', 2)
    })
    $('.slide-dot4').on('click', function () {
        $('.col-md-6').children('.slider').slick('slickGoTo', 3)
    })
    $('.slider-wrapper').children('.slider').slick({
        arrows: false,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        draggable: false,
        swipe: false
    })
    $('.arrow-next').on('click', function () {
        $('.slider').slick('slickNext')
    })
    $('.arrow-prev').on('click', function () {
        $('.slider').slick('slickPrev')
    })
});
let slide = document.querySelectorAll('.friends-dot');
for (let i = 0; i < slide.length; i++) {
    slide[i].addEventListener('click', myFunction);

    function myFunction(event) {
        if (event.target.classList.contains('friends-dot_active')) {} else {
            for (let i = 0; i < slide.length; i++) {
                slide[i].classList.remove('friends-dot_active')
            }
            event.target.classList.add('friends-dot_active')

            function newFunction() {
                slide[i].classList.remove('friends-dot_active')
            }
            setTimeout(newFunction, 5500);
        }
    }
}
let Song;
let v;
let min;
let sec;
progressBar = document.querySelector('.progress-bar');
progressWrap = document.querySelector('.progress-wrap');
resetBtn = document.querySelector('.player__resetbtn');
stopBtn = document.querySelector('.player__stopbtn');
durationTime = document.querySelector('.duration-time');
durationTime.innerHTML =  parseInt(2631.549388/60) + ':' + parseInt(2631.549388%60);
playBtn = document.querySelector('.play');
playBtn.addEventListener('click', playOrPause);
playerVolume = document.querySelector('.player-volume');
playerVolume.addEventListener('change', volumeFunction);
function volumeFunction() {
        Song.volume = this.value/100;
}
function playOrPause() {
    playBtn.classList.toggle('pause');
    if(Song) {
        if(Song.paused) {
            Song.play();
        }
        else {
            Song.pause();
        }
    } else {
        v = 1;
        min = parseInt(2631.549388/60);
        sec = parseInt(2631.549388%60);
        Song = new Audio('bugle-128.mp3');
            Song.volume = playerVolume.value/100;
        Song.play();
        Song.addEventListener('timeupdate', timeUpdateFunction);
        function timeUpdateFunction() {
            progressBar.style.right = (100 - Song.currentTime/26.31549388) + '%';
            durationTime.innerHTML = min + ':' + (sec - v);
            if((sec - v) < 10) {
                durationTime.innerHTML = min + ':' + '0' + (sec - v);
            }
            if(min < 10) {
                durationTime.innerHTML = '0' + min + ':' + (sec - v);
                if(min < 10 && (sec - v) < 10) {
                    durationTime.innerHTML = '0' + min + ':' + '0' + (sec - v);
                }
            } 
        }
        function refreshCurrentTime() {
            if(Song.paused) {

            }
            else {
                if((sec - v) == 0) {
                    sec = 59; 
                    if(sec == 59) {
                        v = 0;
                    }
                    min--;
                }
                else {
                    v = v + 1;
                }
               if (min == 0 && (sec - v) == 0) {
                playBtn.classList.toggle('pause');
                   Song.pause();
                   Song = '';
                clearInterval(g);
               }
            }  
            }
            
        g = setInterval(refreshCurrentTime, 1000);
    }

}


resetBtn.addEventListener('click', resetFunction);
function resetFunction() {
    if(Song) {
        v = 0;
            min = parseInt(2631.549388/60);
            sec = parseInt(2631.549388%60);
        playBtn.classList.add('pause');
        Song.pause();
        Song = '';
        clearInterval(g);
        Song = new Audio('bugle-128.mp3');
        playerVolume.value = 50;
            Song.volume = playerVolume.value/100;
        Song.play();
        Song.addEventListener('timeupdate', timeUpdateFunction);
        function timeUpdateFunction() {
            progressBar.style.right = (100 - Song.currentTime/26.31549388) + '%';
            durationTime.innerHTML = min + ':' + (sec - v);
            if((sec - v) < 10) {
                durationTime.innerHTML = min + ':' + '0' + (sec - v);
            }
            if(min < 10) {
                durationTime.innerHTML = '0' + min + ':' + (sec - v);
                if(min < 10 && (sec - v) < 10) {
                    durationTime.innerHTML = '0' + min + ':' + '0' + (sec - v);
                }
            } 
        }
        function refreshCurrentTime() {
            if(Song.paused) {

            }
            else {
                if((sec - v) == 0 || (sec - v) < 0) {
                    sec = 59; 
                    if(sec == 59) {
                        v = 0;
                    }
                    min--;
                }
                else {
                    v = v + 1;
                }
               if (min == 0 && (sec - v) == 0) {
                   Song.pause();
                   Song = '';
                clearInterval(g);
               }
            }  
            }
            
        g = setInterval(refreshCurrentTime, 1000);
        }
    }
stopBtn.addEventListener('click',stopFunction);
    function stopFunction() {
        if(Song) {
            playerVolume.value = 50;
            Song.volume = playerVolume.value/100;
            progressBar.style.right = 100 + '%';
            v = 0;
            min = parseInt(2631.549388/60);
            sec = parseInt(2631.549388%60);
            Song.pause();
            Song = '';
            clearInterval(g);
                playBtn.classList.remove('pause');
                durationTime.innerHTML = min + ':' + sec;
        }
    }

    progressWrap.addEventListener('click', progressBarCurrentTime);
    function progressBarCurrentTime(event) {
        Song.currentTime = ((event.clientX - 597)/(6.62/26.31549388));
            min = parseInt((2631.549388 - Song.currentTime)/60);
            sec = parseInt((2631.549388 - Song.currentTime)%60);
            if((sec - v) < 0 || (sec - v) == 0) {
                if(min == 0) {
                    sec = 0;
                    v = 0;
                    progressBar.style.right = 0 + '%';
                    playBtn.classList.toggle('pause');
                    Song.pause();
                   Song = '';
                clearInterval(g);
                }
                else {
                    sec = 59;
                     v = 0
                }
            }
    }
    

galleryBackground = document.querySelectorAll('.gallery-background');
for(i=0; i<galleryBackground.length; i++) {
    galleryBackground[i].addEventListener('mouseover', overFunction);
    function overFunction(event) {
        event.target.querySelector('.box-gallery-search').classList.add('box-gallery-search_active')
    }
    galleryBackground[i].addEventListener('mouseout', outFunction);
    function outFunction(event) {
        event.target.querySelector('.box-gallery-search').classList.remove('box-gallery-search_active');
    }
}

