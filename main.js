scorerightwrist=0;
song="";
leftWristx=0;
rightWristx=0;
leftWristy=0;
rightWristy=0;
scoreleftwrist=0;
function preload(){
song= loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPosses);
}
function gotPosses(results){
if(results.length >0){

    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("score left wrist=" +scoreleftwrist);

    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("score right wrist="+scorerightwrist);

    console.log(results);
    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("leftWristx="+leftWristx+"leftWristy"+leftWristy);
    
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("rightWristx="+rightWristx+"rightWristy"+rightWristy);
}
}
function modelLoaded(){
    console.log("Posenet is initialized");
}
function draw(){
    image(video,0,0,600,500);
    fill(255,0,0);
    stroke(255,0,0);
    if(scorerightWrist>0.2){
        circle(rightWristx,rightWristy,20);
        if(rightWristy>0 && rightWristy<=100){
            document.getElementById("speed").innerHTML="speed =0.5x";
            song.rate(0.5);
        }
        if(rightWristy>100 && rightWristy<=200){
            document.getElementById("speed").innerHTML="speed =1x";
            song.rate(1);
        }
        if(rightWristy>200 && rightWristy<=300){
            document.getElementById("speed").innerHTML="speed =1.5x";
            song.rate(1.5);
        }
        if(rightWristy>300 && rightWristy<=400){
            document.getElementById("speed").innerHTML="speed =2x";
            song.rate(2);
        }
        if(rightWristy>400 && rightWristy<=500){
            document.getElementById("speed").innerHTML="speed =2.5x";
            song.rate(2.5);
        }
    }
    if (scoreleftwrist>0.2){
        circle(leftWristx,leftWristy,20);
        Numberleftwristy=Number(leftWristy);
        removedecimals=floor(Numberleftwristy);
        volume=removedecimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Stop(){
    song.stop();
}