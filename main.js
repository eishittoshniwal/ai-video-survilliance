status1=""
object=[]

function preload(){
    video=createVideo("video.mp4")
    video.hide()

}

function setup() {
    canvas=createCanvas(300,300)
    canvas.position(600,250)
}

function start() {
    objectdetector=ml5.objectDetector("cocossd",modelloaded)
    document.getElementById("status").innerHTML="status: detecting objects"
} 

function modelloaded() {
    console.log("MODEL HAS BEEN LOADED")
    status1=true
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotresult(error,results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        object=results
    }
}

function draw() {
    image(video,0,0,300,300)
    if (status1!="") {
        objectdetector.detect(video,gotresult)
        for(i=0; i<object.length;i++){
          document.getElementById("status").innerHTML="status= objects detected"
          document.getElementById("no_of_objects").innerHTML="no of objects= "+object.length
          fill("#adff2f")
          percent=floor(object[i].confidence*100)
          text(object[i].label+" "+ percent + "%",object[i].x+15,object[i].y+15)
          noFill()
          stroke("#adff2f") 
          rect(object[i].x,object[i].y,object[i].width,object[i].height) 

        }
    }
}