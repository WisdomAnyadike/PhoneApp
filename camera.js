
let videoPage = document.getElementById('videoPage')

let imgs =  JSON.parse(localStorage.getItem('images')) || []

let vid = document.getElementById('vid')
  let canvas = document.getElementById('canvas')
  
  
  async function openCam(){
    videoPage.style.zIndex = 22
   let stream = await navigator.mediaDevices.getUserMedia({video:true , audio:false})
    vid.srcObject = stream
  }
  
  function takePix(){
    canvas.getContext('2d').drawImage( vid,0 , 0 , canvas.width , canvas.height)
    let url = canvas.toDataURL("image/jpg")
    console.log(url)
  
    imgs.push(url)
    localStorage.setItem('images' , JSON.stringify(imgs))
    
  }
  
  let displayPictures = document.getElementById('displayPictures')
  
  function showPictures(){
    let forPics = document.getElementById('forPics')
    displayPictures.style.zIndex = 22
    forPics.innerHTML = ''
    imgs.forEach((img)=> 
  forPics.innerHTML +=  `<img  src="${img}" >`)
    
  }
  
  
  
  