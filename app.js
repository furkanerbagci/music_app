const container = document.querySelector(".contain");
const image = document.querySelector("#music-image");
const title = document.querySelector(".music-details .title");
const singer = document.querySelector(".music-details .singer");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const audio = document.querySelector(".audio");
const duration =document.querySelector("#duration");
const currentTime =document.querySelector("#current-time");
const progressBar =document.querySelector("#progress-bar")
const volume = document.querySelector("#volume")
const volumeBar = document.querySelector("#volume-bar")
const ul = document.querySelector("ul")


const player = new MusicPlayer(musicList); 

function displayMusic(music){
    title.innerHTML = music.getName();   
    singer.innerHTML = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

window.addEventListener("load", ()=>{
    let music = player.getMusic();
    displayMusic(music)
    container.classList.add("playing")  
    playMusic(); 
    displayMusicList(player.musicList)
    isPlayingNow();
});


play.addEventListener("click", ()=>{
    let isMusicPlaying = container.classList.contains("playing")
    isMusicPlaying ? pauseMusic() : playMusic();
})

prev.addEventListener("click",()=>{
    prevMusic()
})

next.addEventListener("click",()=>{
    nextMusic()
})
function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList= "fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing")
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play(); 
}

const calculateTime = (totalSeconds)=>{
    const minute =Math.floor(totalSeconds / 60);
    const second =Math.floor(totalSeconds % 60);
    const updatedSecond = second<10 ?  `0${second}`: `${second}`
    const result = `${minute}:${updatedSecond}`
    return result

}   

//audionun süresini yazar
audio.addEventListener("loadedmetadata",()=>{ 
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration)
})


audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime)
    currentTime.textContent = calculateTime(audio.currentTime)
})

progressBar.addEventListener("input",()=>{
    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime =  progressBar.value
})

//volume bar kontrolü

volumeBar.addEventListener("input",(e)=>{
    const value = e.target.value;
    audio.volume = value/100;
    if(value == 0 ){
        audio.muted = true;
        muteState = "muted"
        volume.classList= "fa-solid fa-volume-xmark"
        
    }else{
        audio.muted = false;
        muteState = "unMuted"
        volume.classList="fa-solid fa-volume-high"
        
    }
})

//audionun ses muted
let muteState = "unMuted"
volume.addEventListener("click",()=>{
    if(muteState=="unMuted"){
        audio.muted = true;
        muteState = "muted"
        volume.classList= "fa-solid fa-volume-xmark"
        volumeBar.value=0
    }else{
        audio.muted = false;
        muteState = "unMuted"
        volume.classList="fa-solid fa-volume-high"
        
    }
})

const displayMusicList = (list)=>{
    for(let i=0; i<list.length; i++){
        let liTag=`<li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center ">
                        <span>${list[i].getName()}</span>
                        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                        <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
                    </li>
                    `;
        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText = calculateTime(liAudioTag.duration)
        });
    }   
}

const selectedMusic = (li)=>{
    player.index = li.getAttribute("li-index")
    displayMusic(player.getMusic())
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing")
        }
        if(li.getAttribute("li-index")== player.index){
            li.classList.add("playing")
        }
    }
}

audio.addEventListener("ended",()=>{
    nextMusic();
})


console.log(player.index)