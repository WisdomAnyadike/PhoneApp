let musicPage = document.getElementById('musicPage')

function showMusic(){
musicPage.style.zIndex = 22


}

let z = 0
 let audio = document.getElementById('audioFile')
 let isPlaying = false

 let songs = [
  {
    "title": "Death Bed",
    "artist": "Powfu",
    "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
    "id": "1"
  },
  {
    "title": "Bad Liar",
    "artist": "Imagine Dragons",
    "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    "id": "2"
  },
  {
    "title": "Faded",
    "artist": "Alan Walker",
    "artwork": "https://samplesongs.netlify.app/album-arts/faded.jpg",
    "url": "https://samplesongs.netlify.app/Faded.mp3",
    "id": "3"
  },
  {
    "title": "Hate Me",
    "artist": "Ellie Goulding",
    "artwork": "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    "url": "https://samplesongs.netlify.app/Hate%20Me.mp3",
    "id": "4"
  },
  {
    "title": "Solo",
    "artist": "Clean Bandit",
    "artwork": "https://samplesongs.netlify.app/album-arts/solo.jpg",
    "url": "https://samplesongs.netlify.app/Solo.mp3",
    "id": "5"
  },
  {
    "title": "Without Me",
    "artist": "Halsey",
    "artwork": "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    "url": "https://samplesongs.netlify.app/Without%20Me.mp3",
    "id": "6"
  } , {
    "title": "Cast",
    "artist": "Shalipopi ",
    "artwork": "https://trendybeatz.com/images/Shallipopi-Presido-La-Pluto-AlbumArtwork1.jpg",
    "url": "https://cdn.trendybeatz.com/audio/Shallipopi-Ft-Cast-Odumodublvck-(TrendyBeatz.com).mp3",
    "id": "7"
  }
 
]





 moveBack()
  
 function displaySongs(i){
  z = i

    if(z < 0){
        z = z + 1
    } else if ( z > (songs.length - 1)){
        z = z - 1
    } else {
        musicPage.innerHTML = ''  
    musicPage.innerHTML = `<div id="div" > <img style="width:200px; height:200px; " src="${songs[i].artwork}" />
    <p style="margin:5px; margin-top:10px; color:white;">${songs[i].title} </p>
    <small style="margin:5px; color:white; ">${songs[i].artist} </small>
    <audio id="audioFile${i}"  loop draggable='true' src="${songs[i].url}"></audio> 

    <div id="controls">
        <input style="color:white;" type="number" id="speedControl" oninput="changeSpeed()" step="0.1" min="0.5" max="2" value="1">
    <button id="playButton" onclick="playMusic()" style="margin-left:15px;" > <iconify-icon icon="ph:play-fill" style="color: white;" width="40"></iconify-icon> </button>
    <input style="background-color:black; width:50px; " type="range" id="volume" min="0" max="1" value="1" step="0.1" oninput="adjustVolume()">
</div>

   
    <button style="position: absolute; top: 0px; left: 10px;" onclick="moveBack()"> <iconify-icon icon="iconamoon:arrow-left-2-bold" style="color: white;" width="24"></iconify-icon> </button>

 
   

     <button style="position: absolute; top: 45%; left: 10px;" onclick="displaySongs(--z)"><iconify-icon icon="raphael:arrowleft" style="color: white;" width="24"></iconify-icon> </button>

       <button style="position:absolute; top: 45%; right: 10px;" onclick="displaySongs(++z)"> <iconify-icon icon="raphael:arrowright" style="color: white;" width="24"></iconify-icon> </button> </div>

       <img style="width:100px; height:30px; margin-top:35px;" src="wisdom (2).jpg">
    `

    audio = document.getElementById(`audioFile${i}`)
    console.log(audio);
    }

 
 }


  function moveBack(){
    z = 0
    y = 0
    musicPage.innerHTML = ''  
    musicPage.innerHTML =  `<div id="songsArray" >   <button style="top: 45px; left:0; z-index: 50;" id="backPage" onclick="backPage()">
          
    <iconify-icon
      icon="dashicons:arrow-left-alt2"
      style="color: black"
      width="20"
    ></iconify-icon>
  </button>   <img style=" position: absolute; width:100px; height:30px; bottom: 20px; left:35%; z-index: 50;" src="wisdom (2).jpg" alt="">  </div>`
   songs.map((song)=> { songsArray.innerHTML += `<button id="songButton${y++}" onclick="displaySongs(${z++})" style='width:340px; height:70px; '> <img style="width:50px; height:50px; margin-left:10px;" src='${song.artwork}' > <p style=" color:white; width:fit-content; display:flex; text-align:left; flex-direction:column; margin-left:20px;" >  <b style="margin-top:20px;"> ${song.title} </b> <small> ${song.artist} </small>   </p>   </button> 
    
   ` 
   })

 
 }



   

 function playMusic(){
  let playButton = document.getElementById('playButton')
 if ( isPlaying === false) {
    audio.play() 
    isPlaying = true;
    playButton.innerHTML = '<iconify-icon icon="solar:pause-bold" style="color: white;" width="40"></iconify-icon>'
} else {
  audio.pause() 
  isPlaying = false;
  playButton.innerHTML = '<iconify-icon icon="ph:play-fill" style="color:white;" width="40"></iconify-icon>'

} 
    
 }

 function adjustVolume(){
    let volume = document.getElementById('volume')
    audio.volume = volume.value
 }



 function changeSpeed () {
    let speedControl = document.getElementById('speedControl');
    const newSpeed = parseFloat(speedControl.value);
    audio.playbackRate = newSpeed; 
}


